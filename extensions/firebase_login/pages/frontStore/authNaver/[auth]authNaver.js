const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const {
  getNaverAuthUrl
} = require('@evershop/firebase_login/services/getNaverAuthUrl');

// eslint-disable-next-line no-unused-vars
module.exports = (request, response, delegate, next) => {
  // Check if customer is already logged in
  if (request.isCustomerLoggedIn()) {
    response.redirect('/');
    return;
  }
  const client_id = process.env.NAVER_CLIENT_ID;
  const homeUrl = process.env.ROOT_URL;
  const redirect_uri = `${homeUrl}${buildUrl('callbackNaver')}`;
  const state = encodeURIComponent(redirect_uri);
  const naverAuthUrl = getNaverAuthUrl(client_id, redirect_uri, state);
  response.redirect(naverAuthUrl);
};
