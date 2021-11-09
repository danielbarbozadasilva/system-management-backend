const status = require("http-status");
const defaultMessage = "Um erro negócio aconteceu";

const ErrorGeneric = require("./erros.generic_error");

module.exports = class ErrorBusinessRule extends ErrorGeneric {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ErrorRegraDeNegocio);
    this.statusCode = status.BAD_REQUEST;
    this.message = message || defaultMessage;
  }
};
