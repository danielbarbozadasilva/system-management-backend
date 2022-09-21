const { decodeToken } = require('../utils.cryptography')
const services = require('../../services/services.user')

const authorizationMiddleware = (permission) => async (req, res, next) => {
  const { token } = req.headers
  const { id, typeUser } = decodeToken(token)
  const idUser = req.params.clientid || req.params.providerid

  if (permission !== '*') {
    services.checkPermissionService(typeUser, permission)
  }

  services.checkIdAuthorizationService(id, idUser, typeUser)
  next()
}

module.exports = authorizationMiddleware
