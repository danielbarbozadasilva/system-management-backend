const status = require('http-status');
const defaultMessage = 'Um erro negócio aconteceu';

const ErrorGenerico = require('./erro-generico');

module.exports = class ErrorRegraDeNegocio extends ErrorGenerico {

  constructor(mensagem) {
    super(mensagem);
    Error.captureStackTrace(this, ErrorRegraDeNegocio);
    this.statusCode = status.BAD_REQUEST;
    this.message = mensagem || defaultMessage;
  }

}
