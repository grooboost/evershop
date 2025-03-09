const {
  OK,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { error } = require('@evershop/evershop/src/lib/log/logger');
const {
  signUpWithVerifiedEmail, registerUser
} = require('@evershop/firebase_login/services/auth/signIn');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const { email, password, password_check, full_name } = request.body;

  try {
    if (!email || email.length === 0) throw new Error("이메일을 입력해주세요.");
    if (!password || password.length === 0) throw new Error("패스워드를 입력해주세요.");
    if (password !== password_check) throw new Error("패스워드가 일치하지 않습니다.");
    if (!full_name || full_name.length === 0) throw new Error("닉네임을 입력해주세요.");

    await signUpWithVerifiedEmail(email, password, full_name);

    response.status(OK);
    next();

  } catch (e) {
    error(e);
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: e.message
      }
    });
  }
};
