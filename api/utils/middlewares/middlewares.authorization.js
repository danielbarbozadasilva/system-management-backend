const criptografiaUitls = require("../cryptography.util");
const usuarioService = require("../../services/usuario.service");

const ErroUsuarioNaoAutorizado = require("../errors/errors.user_not_allowed");
const ErroUsuarioNaoAutenticado = require("../errors/errors.user_not_authenticated");

const autorizar = (rota = "*") => {
  return async (req, res, next) => {
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        const teste = rota;
        const { token } = req.headers;
        if (teste != "*") {
          if (!token) {
            return reject(
              new ErroUsuarioNaoAutenticado("Usuário não autenticado!")
            );
          }

          if (!criptografiaUitls.validaToken(token)) {
            return reject(
              new ErroUsuarioNaoAutenticado("Usuário não autenticado!")
            );
          }

          const { id, email, typeUsuario } =
            criptografiaUitls.decodificaToken(token);

          if (!usuarioService.validaSeEmailJaExiste(email)) {
            return reject(
              new ErroUsuarioNaoAutorizado("Usuário não autorizado!")
            );
          }

          if (
            usuarioService.validaFuncionalidadeNoPerfil(typeUsuario, teste) ===
            false
          ) {
            return reject(
              new ErroUsuarioNaoAutorizado("Usuário não autorizado!")
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
