const status = require("http-status");
const defaultMessage = "Um erro negócio aconteceu";

const ErrorGeneric = require("./erro-generico");

module.exports = class ErrorRegraDeNegocio extends ErrorGeneric {
  constructor(mensagem) {
    super(mensagem);
    Error.captureStackTrace(this, ErrorRegraDeNegocio);
    this.statusCode = status.BAD_REQUEST;
    this.message = mensagem || defaultMessage;
  }
};
