const md5 = require('md5')
const jwt = require('jsonwebtoken')

const md5HashSecret = process.env.MD5_SECRET
const jwtHashSecret = process.env.JWT_SECRET
const jwtTimeLimit = process.env.JWT_VALID_TIME

const UtilCreateHash = (password) => {
  const hashVerify = md5(password + md5HashSecret)
  if (hashVerify) {
    return hashVerify
  }
  return false
}

const UtilCreateToken = (model) => {
  const dataVerify = jwt.sign({ ...model }, jwtHashSecret, {
    expiresIn: `${jwtTimeLimit}`
  })
  if (dataVerify) {
    return dataVerify
  }
  return false
}

const UtilDecodeToken = (token) => {
  const decodeVerify = jwt.decode(token)
  if (decodeVerify) {
    return decodeVerify
  }
  return false
}
const UtilValidateToken = (token) => {
  const verify = jwt.verify(token, jwtHashSecret)
  if (verify) {
    return verify
  }
  return false
}

module.exports = {
  UtilCreateHash,
  UtilCreateToken,
  UtilValidateToken,
  UtilDecodeToken
}
