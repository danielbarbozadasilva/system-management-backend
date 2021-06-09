const joi = require('joi').extend(require('@joi/date'));
const validaDTO = require('../../utils/middlewares/validate-dto.middleware');
const clienteController = require('../../controllers/cliente.controller');

module.exports = (router) => {

  router.route('/cliente')
    .post(
      validaDTO('body', {
        nome: joi.string().required().messages({
          'any.required': `"nome" é um campo obrigatório`,
          'string.empty': `"nome" não deve ser vazio`,
        }),

        data_nascimento: joi.string().required().messages({
          'any.required': `"data de nascimento" é um campo obrigatório`,
          'string.empty': `"data de nascimento" não deve ser vazio`,
        }),
        uf: joi.string().required().messages({
          'any.required': `"uf" é um campo obrigatório`,
          'string.empty': `"uf" não deve ser vazio`,
        }),
     
        cidade: joi.string().required().messages({
          'any.required': `"cidade" é um campo obrigatório`,
          'string.empty': `"cidade" não deve ser vazio`,
        })
        
      }),
      clienteController.cria
    )
    }
 