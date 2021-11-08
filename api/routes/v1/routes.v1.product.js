const joi = require('joi');
const productController = require('../../controllers/controllers.product');

const validaDTO = require('../../utils/middlewares/validate-dto.middleware');
const fileUploadMiddleware = require('../../utils/middlewares/fileUploadMiddleware');
const autorizacaoMiddlewate = require('../../utils/middlewares/authorization.middleware');

module.exports = (router) => {
  router.route('/product').get(productController.listarproducts);

  router.route('/product/:id').get(productController.listaId);

  router.route('/product/:productid').put(
    fileUploadMiddleware('products', true),
    validaDTO('query', {
      category: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          'any.required': `"category id" é um campo obrigatório`,
          'string.empty': `"category id" não deve ser vazio`,
          'string.pattern.base': `"category id" fora do formato esperado`,
        }),
      provider: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),

      namelike: joi.string(),
      allowUnknown: true,
    }),
    productController.alterarproduct
  );
};
