const config = require('config');
const { addProcessor } = require('@evershop/evershop/src/lib/util/registry');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');
const { hookAfter } = require('@evershop/evershop/src/lib/util/hookable');
const { cancelPaymentIntent } = require('./services/cancelPayment');

module.exports = () => {
  addProcessor('cartFields', (fields) => {
    fields.push({
      key: 'payment_method',
      resolvers: [
        async function resolver(paymentMethod) {
          if (paymentMethod !== 'pgtemp') {
            return paymentMethod;
          } else {
            // Validate the payment method
            const pgtempStatus = await getSetting('pgtempPaymentStatus');
            if (parseInt(pgtempStatus, 10) !== 1) {
              return null;
            } else {
              this.setError('payment_method', undefined);
              return paymentMethod;
            }
          }
        }
      ]
    });
    return fields;
  });

  const authorizedPaymentStatus = {
    order: {
      paymentStatus: {
        authorized: {
          name: 'Authorized',
          badge: 'attention',
          progress: 'incomplete'
        },
        failed: {
          name: 'Failed',
          badge: 'critical',
          progress: 'failed'
        },
        refunded: {
          name: 'Refunded',
          badge: 'critical',
          progress: 'complete'
        },
        partial_refunded: {
          name: 'Partial Refunded',
          badge: 'critical',
          progress: 'incomplete'
        }
      },
      psoMapping: {
        'authorized:*': 'processing',
        'failed:*': 'new',
        'refunded:*': 'closed',
        'partial_refunded:*': 'processing',
        'partial_refunded:delivered': 'completed'
      }
    }
  };
  config.util.setModuleDefaults('oms', authorizedPaymentStatus);

  hookAfter('changePaymentStatus', async (order, orderID, status) => {
    console.log('changePaymentStatus', order, orderID, status);
    if (status !== 'canceled') {
      return;
    }
    if (order.payment_method !== 'pgtemp') {
      return;
    }
    await cancelPaymentIntent(orderID);
  });
};
