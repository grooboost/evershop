const { hookAfter } = require('@evershop/evershop/src/lib/util/hookable');
const { addProcessor } = require('@evershop/evershop/src/lib/util/registry');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');
const { voidPaymentTransaction } = require('@evershop/npay/services/voidPaymentTransaction');

module.exports = () => {
  addProcessor('cartFields', (fields) => {
    fields.push({
      key: 'payment_method',
      resolvers: [
        async function resolver(paymentMethod) {
          // Do nothing if the payment method is not npay
          if (paymentMethod !== 'npay') {
            return paymentMethod;
          } else {
            // Validate the payment method
            const npayStatus = await getSetting('npayPaymentStatus');
            if (parseInt(npayStatus, 10) !== 1) {
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

  hookAfter('changePaymentStatus', async (order, orderID, status) => {
    if (status !== 'canceled') {
      return;
    }
    if (order.payment_method !== 'npay') {
      return;
    }
    await voidPaymentTransaction(orderID);
  });
};
