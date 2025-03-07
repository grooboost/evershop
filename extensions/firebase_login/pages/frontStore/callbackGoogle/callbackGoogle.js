const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const {
  getGoogleAuthToken
} = require('@evershop/firebase_login/services/auth/getGoogleAuthToken');
const {
  signInWithGoogleToken, signInEvershop
} = require('@evershop/firebase_login/services/auth/signIn');
const { error } = require('@evershop/evershop/src/lib/log/logger');

/* eslint-disable-next-line no-unused-vars */
module.exports = async (request, response, delegate, next) => {
  const { code } = request.query;
  const homeUrl = process.env.ROOT_URL;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const failureUrl = `${homeUrl}${buildUrl('login')}`;
  const redirect_uri = `${homeUrl}${buildUrl('callbackGoogle')}`;

  try {
    // Get the access token from firebase using the code
    const { id_token, access_token } = await getGoogleAuthToken(
      code,
      client_id,
      client_secret,
      redirect_uri
    );
    const user = await signInWithGoogleToken(id_token, access_token);
    await signInEvershop(request, response, user, user.displayName);
  } catch (err) {
    error(err);
    response.redirect(failureUrl);
  }
};
