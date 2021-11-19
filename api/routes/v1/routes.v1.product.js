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
    .route('/product/:productid')
    .get(
      authorizationMiddleware('*'),
      productController.ControllerListProductById
    )
    

  router
    .route('/provider/:providerid/product')
    .get(
      authorizationMiddleware('*'),
      middlewareValidateDTO('params', {
        providerid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"provider id" is a required field`,
            'string.empty': `"provider id" can not be empty`,
            'string.pattern.base': `"provider id" out of the expected format`,
          }),
      }),
      productController.ControllerListProductByProvider
    )
    .post(
      authorizationMiddleware('CREATE_PRODUCT'),
      middlewareFileUploadMiddleware('products'),
      middlewareValidateDTO('params', {
        provider: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"provider id" is a required field`,
            'string.empty': `"provider id" can not be empty`,
            'string.pattern.base': `"provider id" out of the expected format`,
          }),
      }),
      middlewareValidateDTO(
        'body',
        {
          name: joi.string().required().messages({
            'any.required': `"name" is a required field`,
            'string.empty': `"name" can not be empty`,
          }),
          description: joi.string().required().messages({
            'any.required': `"description" is a required field`,
            'string.empty': `"description" can not be empty`,
          }),
          category: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              'any.required': `"category id" is a required field`,
              'string.empty': `"category id" can not be empty`,
              'string.pattern.base': `"category id" out of the expected format`,
            }),
          price: joi.number().required().messages({
            'any.required': `"preco" is a required field`,
          }),
        },
        {
          allowUnknown: true,
        }
      ),
      productController.ControllerInsertProduct
    )
    .put(
      authorizationMiddleware(''),
      middlewareFileUploadMiddleware('products'),
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

  router.route('/provider/:providerid/product/:productid').delete(
    authorizationMiddleware('REMOVE_PRODUCT'),
    middlewareValidateDTO('params', {
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" is a required field`,
          'string.empty': `"provider id" can not be empty`,
          'string.pattern.base': `"provider id" out of the expected format`,
        }),
      productid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" is a required field`,
          'string.empty': `"provider id" can not be empty`,
          'string.pattern.base': `"provider id" out of the expected format`,
        }),
    }),
    productController.ControllerRemoveProduct
  );
};
