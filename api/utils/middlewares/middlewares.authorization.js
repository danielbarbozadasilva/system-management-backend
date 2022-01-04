const cryptographyUtils = require('../utils.cryptography')
const userService = require('../../services/services.user')

const ErrorUserNotAllowed = require('../errors/errors.user_not_allowed')
const ErrorUnauthenticatedUser = require('../errors/errors.user_not_authenticated')

const authorizationMiddleware =
  (rota = '*') =>
  async (req, res, next) => {
    const test = rota
    const { token } = req.headers
    const provider_id = req.params.providerid
    const client_id = req.params.clientid

    const { id, email, typeUser } = cryptographyUtils.UtilDecodeToken(token)

    const providerStatusKind = await userService.verifyStatusProviderService(id)
    const profileFunctionality =
      await userService.verifyFunctionalityProfileService(typeUser, test)

    await Promise.all([providerStatusKind, profileFunctionality])
      .then((result) => {
        if (test != '*') {
          if (!token) {
            return Promise.reject(
              new ErrorUnauthenticatedUser('Unauthenticated User Error')
            )
          }

          if (!cryptographyUtils.UtilValidateToken(token)) {
            return Promise.reject(
              new ErrorUnauthenticatedUser('Unauthenticated User Error')
            )
          }

          if (typeUser == 2){
            if (id !== provider_id) {
              return Promise.reject(
                new ErrorUserNotAllowed('Unauthorized User!')
              )
            }
          } 
          else if(typeUser == 3) {
            if (id !== client_id) {
              return Promise.reject(
                new ErrorUserNotAllowed('Unauthorized User!')
              )
            }
          }

          if (providerStatusKind) {
            return Promise.reject(
              new ErrorUserNotAllowed(
                'The supplier has not yet been authorized! Contact the administrator.'
              )
            )
          }

          if (profileFunctionality) {
            return Promise.reject(new ErrorUserNotAllowed('Unauthorized User!'))
          }
        }

        return Promise.resolve(next())
      })
      .catch((e) =>
        res
          .status(e.statusCode)
          .send({ success: false, error: { message: e.message } })
      )
  }

module.exports = authorizationMiddleware
