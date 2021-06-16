const joi = require('joi');
const validaDTO = require('../../utils/middlewares/validate-dto.middleware');
const fileUploadMiddleware = require('../../utils/middlewares/fileUploadMiddleware');

const produtoController = require('../../controllers/produto.controller');

const middleTeste = (req, res, next) => {
  console.log('------------------'+JSON.stringify(req.body))
  next()

}

module.exports = (router) => {
  router.route('/produto').get(
    validaDTO('query', {
      categoriaid: joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
        'any.required': `"categoria id" é um campo obrigatório`,
        'string.empty': `"categoria id" não deve ser vazio`,
        'string.pattern.base': `"categoria id" fora do formato experado`,
      }),
      fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
        'any.required': `"fornecedor id" é um campo obrigatório`,
        'string.empty': `"fornecedor id" não deve ser vazio`,
        'string.pattern.base': `"fornecedor id" fora do formato experado`,
      }),
      nomelike: joi.string(),
    }),
    produtoController.lista)

    /////////////////////////////////////////////////////////////
    router.route('/produto/advanced/:params/:value')
    .get(produtoController.advancedList)
  ///////////////////////////////////////////////////////////////


    router.route('/produto/:id').get(
      validaDTO('query', {
        categoriaid: joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
          'any.required': `"categoria id" é um campo obrigatório`,
          'string.empty': `"categoria id" não deve ser vazio`,
          'string.pattern.base': `"categoria id" fora do formato experado`,
        }),
        fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
          'any.required': `"fornecedor id" é um campo obrigatório`,
          'string.empty': `"fornecedor id" não deve ser vazio`,
          'string.pattern.base': `"fornecedor id" fora do formato experado`,
        }),
        nomelike: joi.string(),
      }),
      produtoController.listaPorId)
  

  router.route('/produto').post(
    middleTeste,
    fileUploadMiddleware('produtos', true),

    validaDTO('query', {
      categoriaid: joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
        'any.required': `"categoria id" é um campo obrigatório`,
        'string.empty': `"categoria id" não deve ser vazio`,
        'string.pattern.base': `"categoria id" fora do formato experado`,
      }),
      fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
        'any.required': `"fornecedor id" é um campo obrigatório`,
        'string.empty': `"fornecedor id" não deve ser vazio`,
        'string.pattern.base': `"fornecedor id" fora do formato experado`,
      }),
      nomelike: joi.string(),
    }),
    produtoController.cria)

  
  router.route('/produto/:id').delete(
    validaDTO('query', {
      categoriaid: joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
        'any.required': `"categoria id" é um campo obrigatório`,
        'string.empty': `"categoria id" não deve ser vazio`,
        'string.pattern.base': `"categoria id" fora do formato experado`,
      }),
      fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
        'any.required': `"fornecedor id" é um campo obrigatório`,
        'string.empty': `"fornecedor id" não deve ser vazio`,
        'string.pattern.base': `"fornecedor id" fora do formato experado`,
      }),
      nomelike: joi.string(),
    }),
    produtoController.remove)

  }

