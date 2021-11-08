const status = require("http-status");
const defaultMessage = "O Usuário não esta autorizado";
const ErrorGeneric = require("./erros.generic_error");

module.exports = class ErroUsuarioNaoAutenticado extends ErrorGeneric {
  constructor(mensagem) {
    super(mensagem);
    Error.captureStackTrace(this, ErroUsuarioNaoAutenticado);
    this.statusCode = status.UNAUTHORIZED;
    this.message = mensagem || defaultMessage;
  }
};
