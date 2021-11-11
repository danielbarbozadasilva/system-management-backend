const criptografiaUitls = require('../utils.cryptography');
const userService = require('../../services/services.user');

const ErrorUserNotAllowed = require('../errors/errors.user_not_allowed');
const ErrorUnauthenticatedUser = require('../errors/errors.user_not_authenticated');

const MiddlewareAuthorization = (rota = '*') => {
  return async (req, res, next) => {
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        const teste = rota;
        const { token } = req.headers;
        if (teste != '*') {
          if (!token) {
            return reject(
              new ErrorUnauthenticatedUser('Unauthenticated User Error')
            );
          }

          if (!criptografiaUitls.UtilValidateToken(token)) {
            return reject(
              new ErrorUnauthenticatedUser('Unauthenticated User Error')
            );
          }

          const { id, email, typeuser } =
            criptografiaUitls.UtilDecodeToken(token);

          if (!userService.ServiceValidateEmailExists(email)) {
            return reject(new ErrorUserNotAllowed('Unauthorized User!'));
          }

          if (
            userService.ServiceValidateFunctionalityProfile(typeuser, teste) ===
            false
          ) {
            return reject(new ErrorUserNotAllowed('Unauthorized User!'));
          }
        }
        return resolve(next());
      }, 1000);
    }).catch(function (e) {
      return res
        .status(e.statusCode)
        .send({ success: false, error: { message: e.message } });
    });
  };
};

module.exports = MiddlewareAuthorization;
