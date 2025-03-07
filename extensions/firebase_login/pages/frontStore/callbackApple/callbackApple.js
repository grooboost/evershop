const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const {
  signInWithAppleToken, signInEvershop
} = require('@evershop/firebase_login/services/auth/signIn');
const { error } = require('@evershop/evershop/src/lib/log/logger');
const { generateUserId } = require('@evershop/firebase_login/utils/auth');

/* eslint-disable-next-line no-unused-vars */
module.exports = async (request, response, delegate, next) => {
  const { id_token } = request.body;
  const homeUrl = process.env.ROOT_URL;
  const failureUrl = `${homeUrl}${buildUrl('login')}`;

  try {
    // Get the access token from firebase using the code
    const user = await signInWithAppleToken(id_token);
    await signInEvershop(request, response, user, generateUserId());
  } catch (err) {
    error(err);
    response.redirect(failureUrl);
  }
};
