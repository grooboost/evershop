const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const {
  getNaverAuthToken
} = require('@evershop/firebase_login/services/auth/getNaverAuthToken');
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
  const client_id = process.env.NAVER_CLIENT_ID;
  const client_secret = process.env.NAVER_CLIENT_SECRET;
  const failureUrl = `${homeUrl}${buildUrl('login')}`;

  try {
    // Get the access token from firebase using the code
    const { access_token } = await getNaverAuthToken(
      code,
      client_id,
      client_secret,
      state
    );

    const firebaseToken = await getCustomToken('verifyNaverToken', access_token);
    const user = await signInWithCustomToken(firebaseToken);
    await signInEvershop(request, response, user, user.displayName);
  } catch (err) {
    error(err);
    response.redirect(failureUrl);
  }
};
