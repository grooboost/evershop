const { initializeApp } = require('firebase/app');
const { 
  getAuth, signInWithCredential, signInWithCustomToken, signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, sendEmailVerification,
  updatePassword, updateProfile, sendPasswordResetEmail,
  GoogleAuthProvider, OAuthProvider, AuthErrorCodes } = require("firebase/auth");

const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { select, insert } = require('@evershop/postgres-query-builder');
const { error } = require('@evershop/evershop/src/lib/log/logger');
const { generateDeterministicPassword } = require('@evershop/firebase_login/utils/auth');

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

module.exports.signUpWithVerifiedEmail = async (
  email, password, name
) => {
  try {
    const tempPassword = generateDeterministicPassword(email);
    const result = await signInWithEmailAndPassword(auth, email, tempPassword)
    const user = result.user;
  
    if (!user) {
      throw new Error('No valid user found.');
    } else if (!user.emailVerified) {
      throw new Error('이메일 인증을 완료한 후 다시 시도해주세요.');
    } else {
      console.log('[user]', user);
      await updateProfile(user, { displayName: name });
      await updatePassword(user, password);
    }
  
    return user;
  } catch (error) {
    const { code } = error;
    switch (code) {
      case AuthErrorCodes.USER_DELETED:
        throw new Error("이메일 인증을 완료한 후 다시 시도해주세요.");
      default:
        console.error('Error registering email: ', error);
    }
    throw error;
  }
};

async function createOrSignInTempAccount(email) {
  const password = generateDeterministicPassword(email);
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return credential;
  } catch (error) {
    const { code } = error;
    switch (code) {
      case AuthErrorCodes.EMAIL_EXISTS:
        const signInCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        return signInCredential;
      default:
        throw error;
    }
  }
}

module.exports.createTempEmailAccountAndSendVerfication = async (email) => {
  try {
    const credential = await createOrSignInTempAccount(email);
    await sendEmailVerification(credential.user);
  } catch (error) {
    const { code } = error;
    switch (code) {
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
        throw new Error('Too many request');
      case AuthErrorCodes.INVALID_PASSWORD:
        throw new Error('Email already in use');
      case AuthErrorCodes.INTERNAL_ERROR:
        throw new Error('Bad request');
      default:
        console.error('Error sending email: ', error);
    }
    throw error;
  }
}

module.exports.isVerified = async (email) => {
  const password = generateDeterministicPassword(email);
  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return credential.user.emailVerified;
  } catch (error) {
    return false;
  }
}

module.exports.resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email)
}
