const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const {
  getAppleAuthUrl
} = require('@evershop/firebase_login/services/auth/getAppleAuthUrl');

// eslint-disable-next-line no-unused-vars
module.exports = (request, response, delegate, next) => {
  // Check if customer is already logged in
  if (request.isCustomerLoggedIn()) {
    response.redirect('/');
    return;
  }
  const client_id = process.env.APPLE_CLIENT_ID;
  const homeUrl = process.env.ROOT_URL;
  const redirect_uri = `${homeUrl}${buildUrl('callbackApple')}`;
  const appleAuthUrl = getAppleAuthUrl(client_id, redirect_uri);
  response.redirect(appleAuthUrl);
};
