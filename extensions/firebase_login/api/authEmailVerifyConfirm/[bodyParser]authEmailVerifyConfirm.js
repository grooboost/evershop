const {
  INVALID_PAYLOAD,
  OK,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');
const {
  isVerified
} = require('@evershop/firebase_login/services/auth/signIn');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const { body } = request;
  const { email } = body;
  const verified = await isVerified(email);
  response.status(OK);
  response.$body = {
    data: {
      verified: verified,
    }
  };
  next();
};
