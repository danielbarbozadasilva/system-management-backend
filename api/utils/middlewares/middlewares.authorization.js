const cryptographyUtils = require('../utils.cryptography');
const userService = require('../../services/services.user');

const ErrorUserNotAllowed = require('../errors/errors.user_not_allowed');
const ErrorUnauthenticatedUser = require('../errors/errors.user_not_authenticated');

const MiddlewareAuthorization = (rota = '*') => {
  return async (req, res, next) => {
    new Promise(function (resolve, reject) {
        const test = rota;
        const { token } = req.headers;
        if (test != '*') {
          if (!token) {
            return reject(
              new ErrorUnauthenticatedUser('Unauthenticated User Error')
            );
          }

          if (!cryptographyUtils.UtilValidateToken(token)) {
            return reject(
              new ErrorUnauthenticatedUser('Unauthenticated User Error')
            );
          }

          const { id, email, typeuser } =
            cryptographyUtils.UtilDecodeToken(token);

          if (!userService.ServiceValidateEmailExists(email)) {
            return reject(new ErrorUserNotAllowed('Unauthorized User!'));
          }

          if (
            userService.ServiceValidateFunctionalityProfile(typeuser, test) ===
            false
          ) {
            return reject(new ErrorUserNotAllowed('Unauthorized User!'));
          }
        }
        return resolve(next());
    }).catch(function (e) {
      return res
        .status(e.statusCode)
        .send({ success: false, error: { message: e.message } });
    });
  };
};

module.exports = MiddlewareAuthorization;
