const axios = require('axios');

module.exports.getNaverAuthToken = async (
  code,
  client_id,
  client_secret,
  state
) => {
  const url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&code=${code}&state=${state}`;
  // Using axios to get the access token

  const response = await axios.post(url, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  const { data } = response;

  return data;
};
