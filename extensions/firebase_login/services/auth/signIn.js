const { initializeApp } = require('firebase/app');
const { getAuth, signInWithCredential, signInWithCustomToken, signInWithEmailAndPassword, GoogleAuthProvider, OAuthProvider } = require("firebase/auth");

const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { select, insert } = require('@evershop/postgres-query-builder');
const { error } = require('@evershop/evershop/src/lib/log/logger');

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

async function registerUser(user, name) {
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
        full_name: name,
        status: 1,
        is_firebase_login: true,
        password: uid
      })
      .execute(pool);
  }

  return customer;
}
module.exports.registerUser = registerUser;

module.exports.signInEvershop = async (request, response, user, name) => {
  const homeUrl = process.env.ROOT_URL;
  const successUrl = homeUrl;
  const failureUrl = `${homeUrl}${buildUrl('login')}`;

  const customer = await registerUser(user, name);

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
}

module.exports.signInWithAppleToken = async (
  idToken
) => {
  const provider = new OAuthProvider('apple.com');
  const credential = provider.credential({
    idToken
  });
  const result = await signInWithCredential(auth, credential)

  const user = result.user;

  return user;
};

module.exports.signInWithGoogleToken = async (
  idToken, accessToken
) => {
  const credential = GoogleAuthProvider.credential(idToken, accessToken);
  const result = await signInWithCredential(auth, credential)

  const user = result.user;

  return user;
};

module.exports.signInWithCustomToken = async (
  customToken
) => {
  const result = await signInWithCustomToken(auth, customToken)
  const user = result.user;

  return user;
};

module.exports.signInWithEmail = async (
  email, password
) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
  const user = result.user;

  return user;
};
