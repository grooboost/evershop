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
    const { order_id } = request.body;
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
      const transaction = await select()
        .from('payment_transaction')
        .where('payment_transaction_order_id', '=', order.order_id)
        .load(pool);
      if (!transaction) {
        response.status(INVALID_PAYLOAD);
        response.json({
          error: {
            status: INVALID_PAYLOAD,
            message: 'Not found transaction'
          }
        });
        return;
      }
    
      const amountInt = Math.floor(transaction.amount);
  
      // Call API to authorize the npay order using axios
      // ref. https://developers.pay.naver.com/docs/v2/api#payments-payments_cancel
      const axiosInstance = await createAxiosInstance(request);
      const responseData = await axiosInstance.post(
        `/v1/cancel`,
        {
          paymentId: transaction.transaction_id,
          cancelAmount: amountInt,
          cancelReason: 'cancel_from_admin',
          cancelRequester: '2',
          taxScopeAmount: amountInt,
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
        // Update payment status
        await updatePaymentStatus(order.order_id, 'refunded');

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
