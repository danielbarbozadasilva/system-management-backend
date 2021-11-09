const status = require("http-status");
const defaultMessage = "O Usuário não esta autorizado";
const ErrorGeneric = require("./erros.generic_error");

module.exports = class ErrorUnauthorizedUser extends ErrorGeneric {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ErrorUnauthorizedUser);
    this.statusCode = status.FORBIDDEN;
    this.message = message || defaultMessage;
  }
};
