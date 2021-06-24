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

    if (!criptografiaUitls.validaToken(token)) {
      return res
        .status(401)
        .send({ mensagem: "usuário não autenticado." });
    }

    const { id, email, tipoUsuario } = criptografiaUitls.decodificaToken(token);

    if (!(await usuarioService.validaSeEmailJaExiste(email))) {
      return res.status(403).send({
        mensagem: "usuário não autorizado."
      })
    }
    if (rota != '*') {

      if (!usuarioService.validaFuncionalidadeNoPerfil(tipoUsuario, rota))
        return res.status(403).send({
          mensagem: "usuário não autorizado."
        })

    }

    req.usuario = {
      id,
      email,
      tipoUsuario,
    }


    return next();
  }
}

module.exports = autorizar;
