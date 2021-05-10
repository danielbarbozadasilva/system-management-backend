
const usuarioController = require('../../controllers/usuario.controller');
const { validaDTO } = require('../../util/middlewares/validate-dto.middleware');


const joi = require('joi');

module.exports = (router) => {

  router.route('/auth')
    .post(
      validaDTO('body', {
        email: joi.string().required().messages({
          'any.required': `"e-mail" é um campo obrigatório`,
          'string.empty': `"e-mail" não deve ser vazio`,
        }),
        senha: joi.string().required().messages({
          'any.required': `"senha" é um campo obrigatório`,
          'string.empty': `"senha" não deve ser vazio`,
        }),
      }),
      usuarioController.auth
    )

}
