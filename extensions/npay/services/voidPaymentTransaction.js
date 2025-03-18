const { error } = require('@evershop/evershop/src/lib/log/logger');
const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { createAxiosInstance } = require('@evershop/npay/services/requester');

async function voidPaymentTransaction(orderID) {
  try {
    const transaction = await select()
      .from('payment_transaction')
      .where('payment_transaction_order_id', '=', orderID)
      .load(pool);
    if (!transaction) {
      return;
    }
  
    const amountInt = Math.floor(transaction.amount);

    // Call API to authorize the npay order using axios
    // ref. https://developers.pay.naver.com/docs/v2/api#payments-payments_cancel
    const axiosInstance = await createAxiosInstance();
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
      // do nothing
    } else {
      throw new Error(message);
    }
  } catch (err) {
    error(err);
    throw err;
  }
}

module.exports.voidPaymentTransaction = voidPaymentTransaction;
