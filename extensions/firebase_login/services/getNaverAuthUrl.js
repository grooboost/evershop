module.exports.getNaverAuthUrl = (client_id, redirect_uri, state) => `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}`;
