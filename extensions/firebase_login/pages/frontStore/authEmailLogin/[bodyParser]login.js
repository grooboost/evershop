const {
  translate
} = require('@evershop/evershop/src/lib/locale/translate/translate');
const {
  INVALID_PAYLOAD,
  OK,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');
const {
  signInWithEmail, registerUser
} = require('@evershop/firebase_login/services/auth/signIn');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const { body } = request;
  const { email, password } = body;
  
  try {
    const user = await signInWithEmail(email, password);
    const customer = await registerUser(user, user.displayName);
    
    // Login the customer
    request.session.customerID = customer.customer_id;
    // Delete the password field
    delete customer.password;
    // Save the customer in the request
    request.locals.customer = customer;
    request.session.save((e) => {
      if (e) {
        response.status(INTERNAL_SERVER_ERROR);
        response.json({
          error: {
            status: INTERNAL_SERVER_ERROR,
            message
          }
        });
      } else {
        response.status(OK);
        response.$body = {
          data: {
            sid: request.sessionID
          }
        };
        next();
      }
    });
  } catch (error) {
    response.status(INVALID_PAYLOAD);
    response.json({
      error: {
        status: INVALID_PAYLOAD,
        message: error.message
      }
    });
  }
};
