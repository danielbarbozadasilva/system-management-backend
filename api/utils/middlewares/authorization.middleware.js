const criptografiaUitls = require('../criptografia.util');
const usuarioService = require('../../services/usuario.service');

const autorizar = (rota = '*') => {
  return async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
      return res.status(403).send({
        mensagem: "usuário não autorizado."
      })
    }

    // validar o token informado
    if (!criptografiaUitls.validaToken(token)) {
      return res
        .status(401)
        .send({ mensagem: "usuário não autenticado." });
    }

    const { id, email, tipoUsuario } = criptografiaUitls.decodificaToken(token);
    // validar se o email no token existe
    if (!(await usuarioService.validaSeEmailJaExiste(email))) {
      return res.status(403).send({
        mensagem: "usuário não autorizado."
      })
    }

    // verificar se o usuario informado pussui o privilégio necessario   para executar a rota.
    if (rota != '*') {

      if (!usuarioService.validaFuncionalidadeNoPerfil(tipoUsuario, rota))
        return res.status(403).send({
          mensagem: "usuário não autorizado."
        })

    }

    // incluir usuario na request
    req.usuario = {
      id,
      email,
      tipoUsuario,
    }


    return next();
  }
}

module.exports = autorizar;
