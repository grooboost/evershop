const axios = require('axios');

module.exports.getKakaoAuthToken = async (
  code,
  client_id,
  redirect_uri
) => {
  const url = `https://kauth.kakao.com/oauth/token`;
  // Using axios to get the access token

  const response = await axios.post(url, {
    grant_type: 'authorization_code',
    code,
    client_id,
    redirect_uri
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  });
  const { data } = response;

  return data;
};
