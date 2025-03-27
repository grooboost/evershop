const {
  INVALID_PAYLOAD,
  INTERNAL_SERVER_ERROR,
  OK
} = require('@evershop/evershop/src/lib/util/httpStatus');
const {
  translate
} = require('@evershop/evershop/src/lib/locale/translate/translate');
const { getContextValue } = require('@evershop/evershop/src/modules/graphql/services/contextHelper');
const { getCartByUUID } = require('@evershop/evershop/src/modules/checkout/services/getCartByUUID');
const { emptifyCart } = require('@evershop/otable/services/checkout/emptifyCart');


module.exports = async (request, response, delegate, next) => {
  try {
    const cartId = getContextValue(request, 'cartId');
    if (cartId) {
      const cart = await getCartByUUID(cartId);
      await emptifyCart(cart);
    }
    response.status(OK);
    response.$body = {
      data: {
        cart_id: cartId,
      }
    };
    next();
  } catch (error) {
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        message: error.message,
        status: INTERNAL_SERVER_ERROR
      }
    });
  }
};
