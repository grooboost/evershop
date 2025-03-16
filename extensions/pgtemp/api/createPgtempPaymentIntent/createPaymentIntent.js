const { select } = require('@evershop/postgres-query-builder');
const smallestUnit = require('zero-decimal-currencies');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const {
  OK,
  INVALID_PAYLOAD
} = require('@evershop/evershop/src/lib/util/httpStatus');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');
const { getPaymentIntent } = require('@evershop/pgtemp/services/getPayment');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  // eslint-disable-next-line camelcase
  const { cart_id, order_id } = request.body;
  // Check the cart
  const cart = await select()
    .from('cart')
    .where('uuid', '=', cart_id)
    .load(pool);

  if (!cart) {
    response.status(INVALID_PAYLOAD);
    response.json({
      error: {
        status: INVALID_PAYLOAD,
        message: 'Invalid cart'
      }
    });
  } else {
    const pgtempConfig = getConfig('system.pgtemp', {});
    let pgtempSecretKey;

    if (pgtempConfig.secretKey) {
      pgtempSecretKey = pgtempConfig.secretKey;
    } else {
      pgtempSecretKey = await getSetting('pgtempSecretKey', '');
    }
    const pgtempPaymentMode = await getSetting('pgtempPaymentMode', 'capture');

    const pgtemp = await getPaymentIntent(pgtempSecretKey);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await pgtemp.paymentIntents.create({
      amount: smallestUnit.default(cart.grand_total, cart.currency),
      currency: cart.currency,
      metadata: {
        // eslint-disable-next-line camelcase
        cart_id,
        order_id
      },
      automatic_payment_methods: {
        enabled: true
      },
      capture_method:
        pgtempPaymentMode === 'capture' ? 'automatic_async' : 'manual'
    });

    response.status(OK);
    response.json({
      data: {
        clientSecret: paymentIntent.client_secret
      }
    });
  }
};
