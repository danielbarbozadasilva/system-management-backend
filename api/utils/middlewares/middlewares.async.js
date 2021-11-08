const ErrorGeneric = require('../errors/erro-generico');

const asyncMiddleware = (fn, options) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    if (err instanceof ErrorGeneric) {
      return res.status(err.statusCode).send({
        detalhes: [err.message],
      });
    } else {
      return res.status(500).send({
        mensagem: 'Ocoreu um erro interno, solicitar admin da solução',
      });
    }
  });
};

module.exports = asyncMiddleware;
