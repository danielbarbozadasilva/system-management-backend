const status = require('http-status');
const defaultMessage = 'Um erro aconteceu';

class ErrorGenerico extends Error {
  constructor(message) {
    super(message)
    Error.captureStackTrace(this, ErrorGenerico);
    this.statusCode = status.INTERNAL_SERVER_ERROR;
    this.message = message || defaultMessage;
  }
}

module.exports = ErrorGenerico
