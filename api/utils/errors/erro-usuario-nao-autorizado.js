const status = require("http-status");
const defaultMessage = "O Usuário não esta autorizado";
const ErrorGenerico = require("./erro-generico");

module.exports = class ErroUsuarioNaoAutorizado extends ErrorGenerico {
  constructor(mensagem) {
    super(mensagem);
    Error.captureStackTrace(this, ErroUsuarioNaoAutorizado);
    this.statusCode = status.FORBIDDEN;
    this.message = mensagem || defaultMessage;
  }
};
