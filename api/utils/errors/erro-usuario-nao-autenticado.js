const status = require("http-status");
const defaultMessage = "O Usuário não esta autorizado";
const ErrorGenerico = require("./erro-generico");

module.exports = class ErroUsuarioNaoAutenticado extends ErrorGenerico {
  constructor(mensagem) {
    super(mensagem);
    Error.captureStackTrace(this, ErroUsuarioNaoAutenticado);
    this.statusCode = status.UNAUTHORIZED;
    this.message = mensagem || defaultMessage;
  }
};
