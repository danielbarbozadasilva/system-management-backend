const validaDTO = require('../../utils/middlewares/validate-dto.middleware');
const categoriaController = require('../../controllers/categoria.controller');
const joi = require('joi');
const fileUploadMiddleware = require('../../utils/middlewares/fileUploadMiddleware');

module.exports = (router) => {

  router
    .route('/categoria')
    .get(
      categoriaController.lista
    )
    .post(
      fileUploadMiddleware('categorias'),
      validaDTO('body', {
        nome: joi.string().required().messages({
          'any.required': `"nome" é um campo obrigatório`,
          'string.empty': `"nome" não deve ser vazio`,
        }),
        descricao: joi.string().required().messages({
          'any.required': `"descricao" é um campo obrigatório`,
          'string.empty': `"descricao" não deve ser vazio`,
        }),
        status: joi.boolean().required().messages({
          'any.required': `"status" é um campo obrigatório`,
          'booleam.empty': `"status" não deve ser vazio`,
        }),

      }),
      categoriaController.cria
    )


  router
    .route('/categoria/:idcategoria')
    .get(
      categoriaController.buscaPorId
    )
    .put(
      validaDTO('param', {
        idcategoria: joi.string().required().messages({
          'any.required': `"id" é um campo obrigatório`,
          'string.empty': `"id" não deve ser vazio`,
        }),
      }),
      validaDTO('body', {
        nome: joi.string().required().messages({
          'any.required': `"nome" é um campo obrigatório`,
          'string.empty': `"nome" não deve ser vazio`,
        }),
        descricao: joi.string().required().messages({
          'any.required': `"descricao" é um campo obrigatório`,
          'string.empty': `"descricao" não deve ser vazio`,
        }),
        status: joi.boolean().required().messages({
          'any.required': `"status" é um campo obrigatório`,
          'booleam.empty': `"status" não deve ser vazio`,
        }),

      }),
      categoriaController.altera
    )
    .delete(
      validaDTO('param', {
        idcategoria: joi.string().required().messages({
          'any.required': `"nome" é um campo obrigatório`,
          'string.empty': `"nome" não deve ser vazio`,
        }),
      }),
      categoriaController.deleta
    )


}
