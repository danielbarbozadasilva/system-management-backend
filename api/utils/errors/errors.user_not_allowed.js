const status = require("http-status");
const defaultMessage = "O Usuário não esta autorizado";
const ErrorGeneric = require("./erros.generic_error");

module.exports = class ErroUsuarioNaoAutorizado extends ErrorGeneric {
  constructor(mensagem) {
    super(mensagem);
    Error.captureStackTrace(this, ErroUsuarioNaoAutorizado);
    this.statusCode = status.FORBIDDEN;
    this.message = mensagem || defaultMessage;
  }
};
