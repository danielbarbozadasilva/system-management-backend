const md5 = require('md5');
const jwt = require('jsonwebtoken');

const md5_hash_secret = process.env.MD5_SECRET;
const jwt_hash_secret = process.env.JWT_SECRET;
const jwt_time_limit = process.env.JWT_VALID_TIME;

const UtilCreateHash = (password) => {
  return md5(password + md5_hash_secret);
};

const UtilCreateToken = (model) => {
  return jwt.sign({ ...model }, jwt_hash_secret, {
    expiresIn: `${jwt_time_limit}m`,
  });
};

const UtilDecodeToken = (token) => {
  return jwt.decode(token);
};

const UtilValidateToken = (token) => {
  try {
    jwt.verify(token, jwt_hash_secret);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  UtilCreateHash,
  UtilCreateToken,
  UtilValidateToken,
  UtilDecodeToken,
};
