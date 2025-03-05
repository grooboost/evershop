const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const {
  signInWithAppleToken
} = require('@evershop/firebase_login/services/signIn');
const { select, insert } = require('@evershop/postgres-query-builder');
const { error } = require('@evershop/evershop/src/lib/log/logger');
const { generateUserId } = require('@evershop/firebase_login/utils/auth');

/* eslint-disable-next-line no-unused-vars */
module.exports = async (request, response, delegate, next) => {
  console.log(request);
  const { id_token } = request.query;
  const homeUrl = process.env.ROOT_URL;
  const successUrl = homeUrl;
  const failureUrl = `${homeUrl}${buildUrl('login')}`;

  try {
    // Get the access token from firebase using the code
    const user = await signInWithAppleToken(id_token);
    const { uid, email } = user;

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
          full_name: generateUserId(),
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
        error(e);
        response.redirect(failureUrl);
      } else {
        response.redirect(successUrl);
      }
    });
  } catch (err) {
    error(err);
    response.redirect(failureUrl);
  }
};
