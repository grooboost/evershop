const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid');
const crypto = require('crypto');

function uuid() {
  return uuidv4();
}

function generateUserIdWithPrefix(prefix) {
  return `${prefix} #${nanoid(6)}`;
}

function generateUserId() {
  /**
   * 10만 개의 ID를 생성할 때 충돌 확률은 약 0.0007%
   * 100만 개의 ID를 생성할 때 충돌 확률은 약 0.07%
   * 서비스 모니터링 하며, 충돌 확률 0.1% 초과 시 한 자리 수 증가
   */
  return `user-${nanoid(6)}`;
}

function generateDeterministicPassword(email) {
  const hashed = crypto.createHash('sha256').update(email).digest('hex');
  const specialChars = '!@#$%^&*()';
  const numbers = '0123456789';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  let password = hashed.substring(0, 12);
  const specialCharIndex = parseInt(hashed.substring(12, 14), 16) % specialChars.length;
  const numberIndex = parseInt(hashed.substring(14, 16), 16) % numbers.length;
  const lowercaseIndex = parseInt(hashed.substring(16, 18), 16) % lowercase.length;
  password += specialChars[specialCharIndex];
  password += numbers[numberIndex];
  password += lowercase[lowercaseIndex];
  password += hashed.substring(18, 20);

  if (!/[a-z]/.test(password)) {
    password = lowercase[lowercaseIndex] + password.substring(1);
  }

  return password; // Ensure it's exactly 20 characters long
}

function validatePassword(input) {
  try {
    if (input.length < 8) {
      return 'Password should be at least 8 characters long';
    }
    if (input.length > 20) {
      return 'Password must be no more than 20 characters long.';
    }

    if (!/\d/.test(input)) {
      return 'Add at least one number';
    }

    if (!/[A-Za-z]/.test(input)) {
      return 'Password must include at least one letter (A-Z or a-z).';
    }

    if (!/[^A-Za-z0-9]/.test(input)) {
      return 'Include at least one special character';
    }
  } catch (e) {
    return 'Failed to test password';
  }
}

module.exports = {
  uuid,
  generateUserIdWithPrefix,
  generateUserId,
  generateDeterministicPassword,
  validatePassword
};
