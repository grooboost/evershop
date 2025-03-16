const { select, update } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const {
  getSetting
} = require('@evershop/evershop/src/modules/setting/services/setting');
const {
  addNotification
} = require('@evershop/evershop/src/modules/base/services/notifications');
const { error } = require('@evershop/evershop/src/lib/log/logger');
const {
  updatePaymentStatus
} = require('@evershop/evershop/src/modules/oms/services/updatePaymentStatus');
const { getPaymentIntent } = require('@evershop/pgtemp/services/getPayment');


// PG에서 별도로 웹훅을 주지 않는 경우 사용
const sendSelfWebhook = async (paymentIntent, secretKey, orderId) => {
  const homeUrl = getConfig('shop.homeUrl', 'http://localhost:3000');
  const url = `${homeUrl}${buildUrl('pgtempWebHook', {})}`;
  const axios = require('axios');

  // 웹훅 URL과 필요한 헤더를 설정
  const headers = {
    'Content-Type': 'application/json',
    'NaverPay-Signature': secretKey
  };

  // paid로 전환 테스트 -> succeeded
  // authorized로 전환 테스트 -> amount_capturable_updated
  // payment_intent.succeeded 이벤트 처리를 위한 데이터
  const type = paymentIntent.status === 'succeeded'? 'succeeded' 
  : paymentIntent.status === 'requires_capture'? 'amount_capturable_updated'
  : 'unknown'
  const data = {
    type: `payment_intent.${type}`,
    data: {
      object: {
        id: paymentIntent.id, // 예시 결제 인텐트 ID
        amount: 100,   // 거래 금액
        currency: 'KRW', // 통화
        metadata: {
          order_id: orderId // 관련 주문 ID
        }
      }
    }
  };

  console.log(`Send test webhook to ${url}\n`, data);

  // Axios를 사용하여 POST 요청을 보냅니다
  axios.post(url, data, { headers })
    .then(async response => {
      console.log('성공적으로 처리되었습니다:', response.data);
    })
    .catch(error => {
      console.error('처리 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
    });
}

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  try {
    const { order_id, paymentId } = request.query;
    // Check if order exist
    const order = await select()
      .from('order')
      .where('uuid', '=', order_id)
      .load(pool);

    if (!order) {
      // Redirect to the home page
      response.redirect(buildUrl('homepage'));
      return;
    }

    const pgtempConfig = getConfig('system.pgtemp', {});
    let pgtempSecretKey;
    if (pgtempConfig.secretKey) {
      pgtempSecretKey = pgtempConfig.secretKey;
    } else {
      pgtempSecretKey = await getSetting('pgtempSecretKey', '');
    }
    const pgtempPaymentMode = await getSetting('pgtempPaymentMode', 'capture');
    const pgtemp = await getPaymentIntent(pgtempSecretKey);

    // TODO: payment를 실제로 읽어오도록 수정
    let paymentIntent = await pgtemp.paymentIntents.retrieve(paymentId);
    if (pgtempPaymentMode === 'authorizeOnly') paymentIntent.status = 'requires_capture';
    // Check if the payment intent is succeeded
    if (
      (pgtempPaymentMode === 'capture' &&
        paymentIntent.status === 'succeeded') ||
      (pgtempPaymentMode === 'authorizeOnly' &&
        paymentIntent.status === 'requires_capture')
    ) {
      sendSelfWebhook(paymentIntent, pgtempSecretKey, order_id);

      // Redirect to the order success page
      response.redirect(buildUrl('checkoutSuccess', { orderId: order_id }));

      return;
    } else {
      // Redirect back to the shopping cart
      // Active the cart
      await update('cart')
        .given({ status: true })
        .where('cart_id', '=', order.cart_id)
        .execute(pool);
      await updatePaymentStatus(order.order_id, 'failed');
      // Add a error notification
      addNotification(request, 'Payment failed', 'error');
      request.session.save(() => {
        // Redirect to the shopping cart
        response.redirect(buildUrl('cart'));
      });
      return;
    }
  } catch (e) {
    error(e);
    response.redirect(buildUrl('homepage'));
    return;
  }
};
