const { select, insert } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
  INVALID_PAYLOAD,
  OK,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');
const { error } = require('@evershop/evershop/src/lib/log/logger');
const {
  updatePaymentStatus
} = require('@evershop/evershop/src/modules/oms/services/updatePaymentStatus');
const { createAxiosInstance } = require('@evershop/npay/services/requester');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { order_id, payment_id } = request.body;
    // Validate the order;
    const order = await select()
      .from('order')
      .where('uuid', '=', order_id)
      .load(pool);

    if (!order) {
      response.status(INVALID_PAYLOAD);
      response.json({
        error: {
          status: INVALID_PAYLOAD,
          message: 'Invalid order id'
        }
      });
    } else {
      // Call API to confirm the npay order using axios
      // ref. https://developers.pay.naver.com/docs/v2/api#payments-payments_confirm
      const axiosInstance = await createAxiosInstance(request);
      const responseData = await axiosInstance.post(
        `/v1/purchase-confirm`,
        {
          paymentId: payment_id,
          requester: '2',
        },
        {
          headers: {
            'X-NaverPay-Idempotency-Key': `${order_id}-confirm`,
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        },
      );

      const { code, message } = responseData.data;
      if (code === 'Success') {
        // Update payment status
        await updatePaymentStatus(order.order_id, 'paid');
        // Add transaction data to database
        await insert('payment_transaction')
          .given({
            payment_transaction_order_id: order.order_id,
            transaction_id: payment_id,
            amount: order.grand_total,
            currency: order.currency,
            status: 'captured',
            payment_action: 'authorize',
            transaction_type: 'online'
          })
          .execute(pool);

        // Save order activities
        await insert('order_activity')
          .given({
            order_activity_order_id: order.order_id,
            comment: `Customer paid using Npay. Transaction ID: ${payment_id}`,
            customer_notified: 0
          })
          .execute(pool);

        response.status(OK);
        response.json({
          data: {}
        });
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
    }
  } catch (err) {
    error(err);
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: 'Internal server error'
      }
    });
  }
};
