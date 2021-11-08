const criptografiaUitls = require("../cryptography.util");
const userService = require("../../services/user.service");

const ErrouserNaoAutorizado = require("../errors/errors.user_not_allowed");
const ErrouserNaoAutenticado = require("../errors/errors.user_not_authenticated");

const autorizar = (rota = '*') => {
  return async (req, res, next) => {
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        const teste = rota;
        const { token } = req.headers;
        if (teste != '*') {
          if (!token) {
            return reject(
              new ErrouserNaoAutenticado("Usuário não autenticado!")
            );
          }

          if (!criptografiaUitls.validaToken(token)) {
            return reject(
              new ErrouserNaoAutenticado("Usuário não autenticado!")
            );
          }

          const { id, email, typeuser } =
            criptografiaUitls.decodificaToken(token);

          if (!userService.validaSeEmailJaExiste(email)) {
            return reject(
              new ErrouserNaoAutorizado("Usuário não autorizado!")
            );
          }

          if (
            userService.validaFuncionalidadeNoPerfil(typeuser, teste) ===
            false
          ) {
            return reject(
              new ErrouserNaoAutorizado("Usuário não autorizado!")
            );
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

module.exports = autorizar;
