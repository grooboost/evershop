const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const {
  getGoogleAuthToken
} = require('@evershop/firebase_login/services/getGoogleAuthToken');
const {
  getGoogleUserInfo
} = require('@evershop/firebase_login/services/getGoogleUserInfo');
const {
  signInWithGoogleToken
} = require('@evershop/firebase_login/services/signIn');
const { select, insert } = require('@evershop/postgres-query-builder');
const { error } = require('@evershop/evershop/src/lib/log/logger');

/* eslint-disable-next-line no-unused-vars */
module.exports = async (request, response, delegate, next) => {
  const { code } = request.query;
  const client_id = getConfig('firebase_login.client_id');
  const client_secret = getConfig('firebase_login.client_secret');
  const homeUrl = getConfig('shop.homeUrl', 'http://localhost:3000');
  const redirect_uri = `${homeUrl}${buildUrl('callbackGoogle')}`;
  const successUrl = getConfig('firebase_login.success_redirect_url', homeUrl);
  const failureUrl = getConfig(
    'firebase_login.failure_redirect_url',
    `${homeUrl}${buildUrl('login')}`
  );

  try {
    // Get the access token from firebase using the code
    const { id_token, access_token } = await getGoogleAuthToken(
      code,
      client_id,
      client_secret,
      redirect_uri
    );
    const user = await signInWithGoogleToken(id_token, access_token);
    const { uid, email, displayName: name } = user;

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
