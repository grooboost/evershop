/* eslint-disable camelcase */
const { select, update } = require('@evershop/postgres-query-builder');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
  INVALID_PAYLOAD,
  OK,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { getValueSync } = require('@evershop/evershop/src/lib/util/registry');
const { error } = require('@evershop/evershop/src/lib/log/logger');
const { getContextValue } = require('@evershop/evershop/src/modules/graphql/services/contextHelper');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');
const { toPrice } = require('@evershop/evershop/src/modules/checkout/services/toPrice');
const { createAxiosInstance } = require('@evershop/npay/services/requester');
const { getApiBaseUrls } = require('@evershop/npay/services/getApiBaseUrls');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  try {
    const { order_id } = request.body;
    const order = await select()
      .from('order')
      .where('uuid', '=', order_id)
      .and('payment_method', '=', 'npay')
      .and('payment_status', '=', 'pending')
      .load(pool);

    if (!order) {
      return response.status(INVALID_PAYLOAD).json({
        error: {
          status: INVALID_PAYLOAD,
          message: 'Invalid order'
        }
      });
    } else {
      // Build the order for createOrder API PayPal
      const items = await select()
        .from('order_item')
        .where('order_item_order_id', '=', order.order_id)
        .execute(pool);
      const catalogPriceInclTax = getConfig(
        'pricing.tax.price_including_tax',
        false
      );
      const amount = {
        currency_code: order.currency,
        value: toPrice(order.grand_total),
        breakdown: {
          item_total: {
            currency_code: order.currency,
            value: catalogPriceInclTax
              ? toPrice(order.sub_total_incl_tax)
              : toPrice(order.sub_total)
          },
          shipping: {
            currency_code: order.currency,
            value: catalogPriceInclTax
              ? toPrice(order.shipping_fee_incl_tax)
              : toPrice(order.shipping_fee_excl_tax)
          },
          discount: {
            currency_code: order.currency,
            value: toPrice(order.discount_amount)
          }
        }
      };
      if (!catalogPriceInclTax) {
        amount.breakdown.tax_total = {
          currency_code: order.currency,
          value: toPrice(order.total_tax_amount)
        };
      }

      const finalAmount = getValueSync('npayFinalAmount', amount, {
        order,
        items
      });

      const orderData = {
        intent: await getSetting('npayPaymentIntent', 'CAPTURE'),
        purchase_units: [
          {
            items: items.map((item) => ({
              name: item.product_name,
              sku: item.product_sku,
              quantity: item.qty,
              unit_amount: {
                currency_code: order.currency,
                value: catalogPriceInclTax
                  ? toPrice(item.final_price_incl_tax)
                  : toPrice(item.final_price)
              }
            })),
            amount: finalAmount
          }
        ],
        application_context: {
          cancel_url: `${getContextValue(request, 'homeUrl')}${buildUrl(
            'npayCancel',
            { order_id }
          )}`,
          return_url: `${getContextValue(request, 'homeUrl')}${buildUrl(
            'npayReturn',
            { order_id }
          )}`,
          shipping_preference: 'SET_PROVIDED_ADDRESS',
          user_action: 'PAY_NOW',
          brand_name: await getSetting('storeName', 'Otable')
        }
      };
      const shippingAddress = await select()
        .from('order_address')
        .where('order_address_id', '=', order.shipping_address_id)
        .load(pool);

      // Add shipping address
      if (shippingAddress) {
        const address = {
          address_line_1: shippingAddress.address_1,
          address_line_2: shippingAddress.address_2,
          admin_area_2: shippingAddress.city,
          postal_code: shippingAddress.postcode,
          country_code: shippingAddress.country
        };
        if (shippingAddress.province) {
          address.admin_area_1 = shippingAddress.province.split('-').pop();
        }
        orderData.purchase_units[0].shipping = {
          address
        };
      } else {
        // This is digital order, no shipping address
        orderData.purchase_units[0].shipping = {
          address: {
            address_line_1: 'No shipping address',
            address_line_2: 'No shipping address',
            admin_area_1: 'No shipping address',
            admin_area_2: 'No shipping address',
            postal_code: 'No shipping address',
            country_code: 'No shipping address'
          }
        };
      }

      const billingAddress = await select()
        .from('order_address')
        .where('order_address_id', '=', order.billing_address_id)
        .load(pool);

      // Add billing address
      if (billingAddress) {
        const address = {
          address_line_1: billingAddress.address,
          address_line_2: billingAddress.address2,
          admin_area_2: billingAddress.city,
          postal_code: billingAddress.postcode,
          country_code: billingAddress.country
        };
        if (billingAddress.province) {
          address.admin_area_1 = billingAddress.province.split('-').pop();
        }
        orderData.purchase_units[0].billing = {
          address
        };
      }

      const amountInt = Math.floor(order.grand_total);
      const finalNpayOrderData = {
        merchantPayKey: '20250317B2sFiH',
        productName: items.map(i => i.product_name).join(", "),
        productCount: 1,
        totalPayAmount: amountInt,
        taxScopeAmount: amountInt,
        taxExScopeAmount: 0,
        returnUrl: orderData.application_context.return_url
      }
      // Call PayPal API to create order using axios
      // ref. https://developers.pay.naver.com/docs/v2/api#etc-etc_pay_reserve
      const axiosInstance = await createAxiosInstance(request);
      const responseData = await axiosInstance.post(
        `/v2/reserve`,
        finalNpayOrderData,
        {
          validateStatus: (status) => status < 500,
          headers: {
            'X-NaverPay-Idempotency-Key': `${order_id}-reserve`,
          },
        }
      );

      const { code, message } = responseData.data;
      const { reserveId } = responseData.data.body
      if (reserveId) {
        const { approve } = await getApiBaseUrls();
        // Update order and insert papal order id
        await update('order')
          .given({ integration_order_id: reserveId })
          .where('uuid', '=', order_id)
          .execute(pool);

        response.status(OK);
        return response.json({
          data: {
            npayOrderId: reserveId,
            approveUrl: `${approve}/${reserveId}`
          }
        });
      } else {
        response.status(INTERNAL_SERVER_ERROR);
        return response.json({
          error: {
            status: INTERNAL_SERVER_ERROR,
            message: responseData.data.message
          }
        });
      }
    }
  } catch (err) {
    error(err);
    return next(err);
  }
};
