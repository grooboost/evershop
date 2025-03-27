const { saveCart } = require('@evershop/evershop/src/modules/checkout/services/saveCart');


/**
 * @param {Cart} cart
 * @returns {Promise<Number|null>}
 * @throws {Error}
 * */
module.exports.emptifyCart = async (cart) => {
  try {
    cart.setData('items', []);
    saveCart(cart);
    return null;
  } catch (error) {
    throw error;
  }
};
