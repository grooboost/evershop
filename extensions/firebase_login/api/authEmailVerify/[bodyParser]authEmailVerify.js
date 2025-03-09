const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const {
  signInWithAppleToken, signInEvershop
} = require('@evershop/firebase_login/services/auth/signIn');
const { error } = require('@evershop/evershop/src/lib/log/logger');
const {
  INVALID_PAYLOAD,
  OK,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');
const {
  createTempEmailAccountAndSendVerfication
} = require('@evershop/firebase_login/services/auth/signIn');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const { body } = request;
  const { email } = body;
  await createTempEmailAccountAndSendVerfication(email);
  response.status(OK);
  response.$body = {
    data: {
      email: email,
    }
  };
  next();
};
