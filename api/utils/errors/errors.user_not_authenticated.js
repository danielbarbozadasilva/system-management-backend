const status = require("http-status");
const defaultMessage = "O Usuário não esta autorizado";
const ErrorGeneric = require("./erros.generic_error");

module.exports = class ErrouserNaoAutenticado extends ErrorGeneric {
  constructor(mensagem) {
    super(mensagem);
    Error.captureStackTrace(this, ErrouserNaoAutenticado);
    this.statusCode = status.UNAUTHORIZED;
    this.message = mensagem || defaultMessage;
  }
};
