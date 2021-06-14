const Joi = require('joi');

const validaDTO = (tipo, parametro, opcoes = {}) => {

  return (req, res, next) => {

    console.log(req[tipo]);

    const schema = Joi.object().keys(parametro);

    const result = schema.validate(req[tipo], {
      allowUnknown: false,
      ...opcoes,
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




// const Joi = require('joi');

// const validaDTO = (tipo, parametro, opcoes = {}) => {

//   return (req, res, next) => {

//     const schema = Joi.object().keys(parametro);

//     const result = schema.validate(req[tipo], {
//       allowUnknown: false,
//       ...opcoes,
//     });


//     if (result.error) {

//       const mensagens = result.error.details.reduce((acc, item) => {

//         return [
//           ...acc, item.message
//         ]

//       }, []);

//       return res.status(400).send({
//         sucesso: false,
//         detalhes: [
//           ...mensagens
//         ]
//       })
//     }

//     return next();

//   }

// }


// module.exports = validaDTO
