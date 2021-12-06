const cryptographyUtils = require('../utils.cryptography');
const userService = require('../../services/services.user');

const ErrorUserNotAllowed = require('../errors/errors.user_not_allowed');
const ErrorUnauthenticatedUser = require('../errors/errors.user_not_authenticated');

const MiddlewareAuthorization = (rota = '*') => {
  return async (req, res, next) => {
    var test = rota;
    var { token } = req.headers;
    var provider_id = req.params.providerid;
    var { id, email, typeUser } = cryptographyUtils.UtilDecodeToken(token);

    const provider_status_kind = await userService.ServiceVerifyStatusProvider(
      id
    );
    const profile_functionality =
      await userService.ServiceVerifyFunctionalityProfile(typeUser, test);

    await Promise.all([provider_status_kind, profile_functionality])
      .then(function (result) {
        if (test != '*') {
          if (!token) {
            return Promise.reject(
              new ErrorUnauthenticatedUser('Unauthenticated User Error')
            );
          }

          if (!cryptographyUtils.UtilValidateToken(token)) {
            return Promise.reject(
              new ErrorUnauthenticatedUser('Unauthenticated User Error')
            );
          }

          if (typeUser == 2 || typeUser == 3) {
            if (id !== provider_id) {
              return Promise.reject(
                new ErrorUserNotAllowed('Unauthorized User!')
              );
            }
          }

          if (provider_status_kind) {
            return Promise.reject(
              new ErrorUserNotAllowed(
                'The supplier has not yet been authorized! Contact the administrator.'
              )
            );
          }

          if (profile_functionality) {
            return Promise.reject(
              new ErrorUserNotAllowed('Unauthorized User!')
            );
          }
        }

        return Promise.resolve(next());
      })
      .catch(function (e) {
        return res
          .status(e.statusCode)
          .send({ success: false, error: { message: e.message } });
      });
  };
};

module.exports = MiddlewareAuthorization;
