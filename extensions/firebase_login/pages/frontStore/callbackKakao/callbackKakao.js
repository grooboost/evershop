const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const {
  getKakaoAuthToken
} = require('@evershop/firebase_login/services/auth/getKakaoAuthToken');
const {
  getCustomToken
} = require('@evershop/firebase_login/services/auth/getCustomToken');
const {
  signInWithCustomToken, signInEvershop
} = require('@evershop/firebase_login/services/auth/signIn');
const { error } = require('@evershop/evershop/src/lib/log/logger');

/* eslint-disable-next-line no-unused-vars */
module.exports = async (request, response, delegate, next) => {
  const { code, state } = request.query;
  const homeUrl = process.env.ROOT_URL;
  const client_id = process.env.KAKAO_CLIENT_ID;
  const failureUrl = `${homeUrl}${buildUrl('login')}`;
  const redirect_uri = `${homeUrl}${buildUrl('callbackKakao')}`;

  try {
    // Get the access token from firebase using the code
    const { access_token } = await getKakaoAuthToken(
      code,
      client_id,
      redirect_uri
    );

    const firebaseToken = await getCustomToken('verifyKakaoToken', access_token);
    const user = await signInWithCustomToken(firebaseToken);
    await signInEvershop(request, response, user, user.displayName);
  } catch (err) {
    error(err);
    response.redirect(failureUrl);
  }
};
