const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithCredential, signInWithCustomToken, GoogleAuthProvider } = require("firebase/auth");

// Initialize Firebase
const firebaseConfig = {
  apiKey: getConfig("firebase_login.apiKey"),
  authDomain: getConfig("firebase_login.authDomain"),
  projectId: getConfig("firebase_login.projectId"),
  storageBucket: getConfig("firebase_login.storageBucket"),
  messagingSenderId: getConfig("firebase_login.messagingSenderId"),
  appId: getConfig("firebase_login.appId"),
  measurementId: getConfig("firebase_login.measurementId"),
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

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
