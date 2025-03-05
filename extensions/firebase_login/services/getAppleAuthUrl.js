module.exports.getAppleAuthUrl = (client_id, redirect_uri) => `https://appleid.apple.com/auth/authorize?response_type=code%20id_token&client_id=${client_id}&redirect_uri=${redirect_uri}`;
