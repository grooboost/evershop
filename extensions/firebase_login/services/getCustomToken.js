const axios = require('axios');

module.exports.getCustomToken = async (
  endpointSubPath,
  accessToken,
) => {
  const verifyUrl = `https://asia-northeast3-grooboost.cloudfunctions.net/${endpointSubPath}`;
  const verifyResponse = await axios.post(verifyUrl, {
    token: accessToken,
  });
  const firebaseToken = verifyResponse.data.firebase_token;
  return firebaseToken;
};
