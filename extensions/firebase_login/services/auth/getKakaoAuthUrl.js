module.exports.getKakaoAuthUrl = (client_id, redirect_uri) => `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;
