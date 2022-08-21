const { decodeToken } = require('../utils.cryptography')
const { checkPermissionService } = require('../../services/services.user')

const authorizationMiddleware = (permission) => async (req, res, next) => {
  const { token } = req.headers
  const { typeUser } = decodeToken(token)
  if (permission !== '*') {
    checkPermissionService(typeUser, permission)
  }
  next()
}

module.exports = authorizationMiddleware
