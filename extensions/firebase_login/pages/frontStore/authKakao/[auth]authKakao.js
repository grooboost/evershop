const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const {
  getKakaoAuthUrl
} = require('@evershop/firebase_login/services/getKakaoAuthUrl');

// eslint-disable-next-line no-unused-vars
module.exports = (request, response, delegate, next) => {
  // Check if customer is already logged in
  if (request.isCustomerLoggedIn()) {
    response.redirect('/');
    return;
  }
  const client_id = process.env.KAKAO_CLIENT_ID;
  const homeUrl = process.env.ROOT_URL;
  const redirect_uri = `${homeUrl}${buildUrl('callbackKakao')}`;
  const kakaoAuthUrl = getKakaoAuthUrl(client_id, redirect_uri);
  response.redirect(kakaoAuthUrl);
};
