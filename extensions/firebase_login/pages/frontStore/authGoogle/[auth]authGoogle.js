const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const {
  getGoogleAuthUrl
} = require('@evershop/firebase_login/services/getGoogleAuthUrl');

// eslint-disable-next-line no-unused-vars
module.exports = (request, response, delegate, next) => {
  // Check if customer is already logged in
  if (request.isCustomerLoggedIn()) {
    response.redirect('/');
    return;
  }
  const client_id = process.env.CLIENT_ID;
  const homeUrl = getConfig('shop.homeUrl', 'http://localhost:3000');
  const redirect_uri = `${homeUrl}${buildUrl('callbackGoogle')}`;
  const googleAuthUrl = getGoogleAuthUrl(client_id, redirect_uri);
  response.redirect(googleAuthUrl);
};
