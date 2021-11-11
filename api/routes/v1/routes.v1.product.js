const joi = require('joi');
const productController = require('../../controllers/controllers.product');

const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto');
const middlewareFileUploadMiddleware = require('../../utils/middlewares/middlewares.file_upload');
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization');
module.exports = (router) => {
  router
    .route('/product')
    .get(
      authorizationMiddleware('*'),
      productController.ControllerListAllProducts
    );

  router
    .route('/product/:id')
    .get(
      authorizationMiddleware('*'),
      productController.ControllerListProductById
    );

  router.route('/product/:productid').put(
    authorizationMiddleware(''),
    middlewareFileUploadMiddleware('products', true),
    middlewareValidateDTO('query', {
      category: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          'any.required': `"category id" is a required field`,
          'string.empty': `"category id" can not be empty`,
          'string.pattern.base': `"category id" out of the expected format`,
        }),
      provider: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          'any.required': `"provider id" is a required field`,
          'string.empty': `"provider id" can not be empty`,
          'string.pattern.base': `"provider id" out of the expected format`,
        }),

      allowUnknown: true,
    }),
    productController.ControllerUpdateProduct
  );
};
