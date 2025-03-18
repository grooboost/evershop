const { select, update } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const {
  INVALID_PAYLOAD,
  OK,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');

module.exports = async (request, response) => {
  // eslint-disable-next-line camelcase
  const { order_id } = request.params;

  // Get the payment transaction
  const transaction = await select()
    .from('payment_transaction')
    .where('payment_transaction_order_id', '=', order_id)
    .load(pool);

  if (!transaction) {
    response.status(INVALID_PAYLOAD);
    response.json({
      error: {
        status: INVALID_PAYLOAD,
        message: 'Can not find payment transaction'
      }
    });
    return;
  }

  // Call API to authorize the npay order using axios
  // ref. https://developers.pay.naver.com/docs/v2/api#payments-payments_cancel
  const axiosInstance = await createAxiosInstance(request);
  const responseData = await axiosInstance.post(
    `/v1/cancel`,
    {
      paymentId: transaction.transaction_id,
      cancelAmount: transaction.amount,
      cancelReason: 'cancel_from_admin',
      cancelRequester: '2',
      taxScopeAmount: transaction.amount,
      taxExScopeAmount: 0,
    },
    {
      headers: {
        'X-NaverPay-Idempotency-Key': `${transaction.transaction_id}-cancel`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    },
  );
  
  const { code, message } = responseData.data;
  if (code === 'Success') {
    // This token actually the npay order id
    const order = await select()
      .from('order')
      .where('uuid', '=', order_id)
      .and('payment_method', '=', 'npay')
      .and('payment_status', '=', 'pending')
      .load(pool);
    if (order) {
      // We re-activate the cart
      await update('cart')
      .given({ status: 1 })
      .where('cart_id', '=', order.cart_id)
      .execute(pool);
    }
    // Redirect to the checkout page
    response.redirect(302, buildUrl('checkout'));
  } else {
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: responseData.data.message
      }
    });
    return;
  }
};
