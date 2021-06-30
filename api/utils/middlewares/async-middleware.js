const ErrorGenerico = require('../errors/erro-generico');

const asyncMiddleware = (fn, options) => (req, res, next) => {

  fn(req, res, next)
    .catch(err => {
      if (err instanceof ErrorGenerico) {
        return res.status(err.statusCode).send({
          detalhes: [
            err.message,
          ]
        });
      } else {
        return res.status(500).send({
          mensagem: "Occoreu um erro interno, solicitar adminsitrador da solução"
        });

      }
    });

}

module.exports = asyncMiddleware;
