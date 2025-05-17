const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const {
  signInWithIdToken, signInEvershop
} = require('@evershop/firebase_login/services/auth/signIn');
const { error } = require('@evershop/evershop/src/lib/log/logger');

/* eslint-disable-next-line no-unused-vars */
module.exports = async (request, response, delegate, next) => {
  const { body } = request;
  const { idToken } = body;
  const homeUrl = process.env.ROOT_URL;
  const failureUrl = `${homeUrl}${buildUrl('login')}`;
  try {
    const user = await signInWithIdToken(idToken);
    await signInEvershop(request, response, user, user.displayName);
  } catch (err) {
    error(err);
    response.redirect(failureUrl);
  }
};
