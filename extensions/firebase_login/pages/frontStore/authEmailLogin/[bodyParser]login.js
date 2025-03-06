const {
  translate
} = require('@evershop/evershop/src/lib/locale/translate/translate');
const {
  INVALID_PAYLOAD,
  OK,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { select, insert } = require('@evershop/postgres-query-builder');
const {
  signInWithEmail
} = require('@evershop/firebase_login/services/signIn');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const { body } = request;
  const { email, password } = body;
  
  try {
    const user = await signInWithEmail(email, password);;

    const { uid, displayName: name } = user;

    // Check if the email exists in the database
    let customer = await select()
      .from('customer')
      .where('email', '=', email)
      .load(pool);

    if (customer && customer.is_firebase_login === false) {
      throw new Error('This email is already registered');
    }
    if (customer && customer.status !== 1) {
      throw new Error('This account is disabled');
    }

    if (!customer) {
      // If the email does not exist, create a new customer
      customer = await insert('customer')
        .given({
          email: email,
          full_name: name,
          status: 1,
          is_firebase_login: true,
          password: uid
        })
        .execute(pool);
    }
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
