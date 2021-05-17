const Joi = require('joi');

// função que retorna um middleware
const validaDTO = (tipo, parametro) => {

  return (req, res, next) => {

    const schema = Joi.object().keys(parametro);

    const result = schema.validate(req[tipo], {
      allowUnknown: false
    });


    if (result.error) {

      const mensagens = result.error.details.reduce((acc, item) => {

        return [
          ...acc, item.message
        ]

      }, []);

      return res.status(400).send({
        sucesso: false,
        detalhes: [
          ...mensagens
        ]
      })
    }

    return next();

  }

}

module.exports = validaDTO

