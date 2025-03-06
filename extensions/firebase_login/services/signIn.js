const { initializeApp } = require('firebase/app');
const { getAuth, signInWithCredential, signInWithCustomToken, signInWithEmailAndPassword, GoogleAuthProvider, OAuthProvider } = require("firebase/auth");

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
