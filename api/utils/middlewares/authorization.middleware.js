const criptografiaUitls = require('../criptografia.util');
const usuarioService = require('../../services/usuario.service');

const ErroUsuarioNaoAutorizado = require('../errors/erro-usuario-nao-autorizado');
const ErroUsuarioNaoAutenticado = require('../errors/erro-usuario-nao-autenticado');


const autorizar = (rota = '*') => {

  return async (req, res, next) => {
    const teste = rota;

    const { token } = req.headers;
    if (!token) {
      throw new ErroUsuarioNaoAutorizado("Usuário não autorizado.")
    }

    if (!criptografiaUitls.validaToken(token)) {
      throw new ErroUsuarioNaoAutenticado("Usuário não autenticado.");
    }

    const { id, email, tipoUsuario } = criptografiaUitls.decodificaToken(token);
    if (!(await usuarioService.validaSeEmailJaExiste(email))) {
      throw new ErroUsuarioNaoAutorizado("Usuário não autorizado.")
    }

    if (teste != '*') {
      if (!usuarioService.validaFuncionalidadeNoPerfil(tipoUsuario, teste))
        throw new ErroUsuarioNaoAutorizado("Usuário não autorizado.");
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

