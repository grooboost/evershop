/* eslint-disable global-require */
const {
  insert,
  startTransaction,
  commit,
  rollback,
  select,
  insertOnUpdate
} = require('@evershop/postgres-query-builder');
const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { emit } = require('@evershop/evershop/src/lib/event/emitter');
const { debug, error } = require('@evershop/evershop/src/lib/log/logger');
const { display } = require('zero-decimal-currencies');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');
const {
  updatePaymentStatus
} = require('@evershop/evershop/src/modules/oms/services/updatePaymentStatus');
const { getPaymentIntent } = require('@evershop/pgtemp/services/getPayment');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const sig = request.headers['naverpay-signature'];

  let event;
  const connection = await getConnection();
  try {
    const pgtempConfig = getConfig('system.pgtemp', {});
    let pgtempSecretKey;
    if (pgtempConfig.secretKey) {
      pgtempSecretKey = pgtempConfig.secretKey;
    } else {
      pgtempSecretKey = await getSetting('pgtempSecretKey', '');
    }
    const pgtemp = await getPaymentIntent(pgtempSecretKey);

    // Webhook enpoint secret
    let endpointSecret;
    if (pgtempConfig.endpointSecret) {
      endpointSecret = pgtempConfig.endpointSecret;
    } else {
      endpointSecret = await getSetting('pgtempEndpointSecret', '');
    }

    event = pgtemp.webhooks.constructEvent(request.body, sig, endpointSecret);
    await startTransaction(connection);
    const paymentIntent = event.data.object;
    const { order_id } = paymentIntent.metadata;
    const transaction = await select()
      .from('payment_transaction')
      .where('transaction_id', '=', paymentIntent.id)
      .load(connection);
    // Load the order
    const order = await select()
      .from('order')
      .where('uuid', '=', order_id)
      .load(connection);
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded': {
        debug('payment_intent.succeeded event received');
        console.log("paymentIntent", paymentIntent);
        console.log("order", order);
        console.log("transaction", transaction);

        // Update the order
        // Create payment transaction
        await insertOnUpdate('payment_transaction', [
          'transaction_id',
          'payment_transaction_order_id'
        ])
          .given({
            amount: parseFloat(
              display(paymentIntent.amount, paymentIntent.currency)
            ),
            payment_transaction_order_id: order.order_id,
            transaction_id: paymentIntent.id,
            transaction_type: 'online',
            payment_action:
              paymentIntent.capture_method === 'manual' ? 'Manual' : 'Automatic'
          })
          .execute(connection);

        if (!transaction) {
          // Capture the PaymentIntent
          await pgtemp.paymentIntents.capture(paymentIntent.id);

          await updatePaymentStatus(order.order_id, 'paid', connection);

          // Add an activity log
          await insert('order_activity')
            .given({
              order_activity_order_id: order.order_id,
              comment: `Customer paid by using Pgtemp. Transaction ID: ${paymentIntent.id}`
            })
            .execute(connection);

          // Emit event to add order placed event
          await emit('order_placed', { ...order });
        }
        break;
      }
      case 'payment_intent.amount_capturable_updated': {
        debug('payment_intent.amount_capturable_updated event received');
        // Create payment transaction
        await insertOnUpdate('payment_transaction', [
          'transaction_id',
          'payment_transaction_order_id'
        ])
          .given({
            amount: parseFloat(
              display(paymentIntent.amount, paymentIntent.currency)
            ),
            payment_transaction_order_id: order.order_id,
            transaction_id: paymentIntent.id,
            transaction_type: 'online',
            payment_action:
              paymentIntent.capture_method === 'manual'
                ? 'authorize'
                : 'capture'
          })
          .execute(connection);

        if (!transaction) {
          await updatePaymentStatus(order.order_id, 'authorized', connection);
          // Add an activity log
          await insert('order_activity')
            .given({
              order_activity_order_id: order.order_id,
              comment: `Customer authorized by using Pgtemp. Transaction ID: ${paymentIntent.id}`
            })
            .execute(connection);

          // Emit event to add order placed event
          await emit('order_placed', { ...order });
        }
        break;
      }
      case 'payment_intent.canceled': {
        debug('payment_intent.canceled event received');
        await updatePaymentStatus(order.order_id, 'canceled', connection);
        break;
      }
      default: {
        debug(`Unhandled event type ${event.type}`);
      }
    }
    await commit(connection);
    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  } catch (err) {
    error(err);
    await rollback(connection);
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
};
