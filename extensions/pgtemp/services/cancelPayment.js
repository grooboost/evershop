const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { error } = require('@evershop/evershop/src/lib/log/logger');
const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');
const { getPaymentIntent } = require('@evershop/pgtemp/services/getPayment');

async function cancelPaymentIntent(orderID) {
  try {
    console.log('cancelPaymentIntent', orderID);
    const transaction = await select()
      .from('payment_transaction')
      .where('payment_transaction_order_id', '=', orderID)
      .load(pool);
    if (!transaction) {
      return;
    }
    console.log('transaction', transaction);
    const pgtempConfig = getConfig('system.pgtemp', {});
    let pgtempSecretKey;

    if (pgtempConfig.secretKey) {
      pgtempSecretKey = pgtempConfig.secretKey;
    } else {
      pgtempSecretKey = await getSetting('pgtempSecretKey', '');
    }
    const pgtemp = await getPaymentIntent(pgtempSecretKey);

    // Get the payment intent
    const paymentIntent = await pgtemp.paymentIntents.retrieve(
      transaction.transaction_id
    );
    if (!paymentIntent) {
      throw new Error('Can not find payment intent');
    }
    console.log('paymentIntent', paymentIntent);
    if (paymentIntent.status === 'canceled') {
      return;
    }
    await pgtemp.paymentIntents.cancel(transaction.transaction_id);
  } catch (err) {
    error(err);
    throw err;
  }
}

module.exports.cancelPaymentIntent = cancelPaymentIntent;
