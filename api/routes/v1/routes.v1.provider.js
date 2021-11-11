const joi = require('joi');

const validateDTO = require('../../utils/middlewares/middlewares.validate_dto');
const fileUploadMiddleware = require('../../utils/middlewares/middlewares.file_upload');
const autorizationMiddleware = require('../../utils/middlewares/middlewares.authorization');

const providerController = require('../../controllers/controllers.provider');
const productController = require('../../controllers/controllers.product');

module.exports = (router) => {
  router
    .route('/provider')
    .get(
      autorizacaoMiddleware('*'),
      providerController.ControllerListAllProviders
    )
    .post(
      autorizacaoMiddleware('ADD_PROVIDER'),
      validateDTO('body', {
        cnpj: joi.string().required().messages({
          'any.required': `"cnpj" is a required field`,
          'string.empty': `"cnpj" can not be empty`,
        }),
        fantasy_name: joi.string().required().messages({
          'any.required': `"fantasy_name" is a required field`,
          'string.empty': `"fantasy_name" can not be empty`,
        }),
        Address: joi.string().required().messages({
          'any.required': `"Address" is a required field`,
          'string.empty': `"Address" can not be empty`,
        }),
        uf: joi.string().required().messages({
          'any.required': `"uf" is a required field`,
          'string.empty': `"uf" can not be empty`,
        }),
        city: joi.string().required().messages({
          'any.required': `"city" is a required field`,
          'string.empty': `"city" can not be empty`,
        }),
        responsible: joi.string().required().messages({
          'any.required': `"responsible" is a required field`,
          'string.empty': `"responsible" can not be empty`,
        }),
        phone: joi.string().required().messages({
          'any.required': `"phone" is a required field`,
          'string.empty': `"phone" can not be empty`,
        }),
        email: joi.string().email().required().messages({
          'any.required': `"email" is a required field`,
          'string.empty': `"email" can not be empty`,
        }),
        password: joi.string().required().messages({
          'any.required': `"password" is a required field`,
          'string.empty': `"password" can not be empty`,
        }),
      }),
      providerController.ControllerInsertProvider
    );

  router
    .route('/provider/filtro')
    .get(
      autorizacaoMiddleware('*'),
      providerController.ControllerListProvidersByLocation
    );

  router.route('/provider/:providerid').get(
    autorizationMiddleware('*'),
    validateDTO('params', {
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
    providerController.ControllerListProviderById
  );

  router.route('/provider/:id').put(
    autorizacaoMiddleware('UPDATE_PROVIDER'),
    validateDTO('params', {
      id: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" is a required field`,
          'string.empty': `"provider id" can not be empty`,
          'string.pattern.base': `"provider id" out of the expected format`,
        }),
    }),
    validateDTO('body', {
      cnpj: joi.string().required().messages({
        'any.required': `"cnpj" is a required field`,
        'string.empty': `"cnpj" can not be empty`,
      }),
      fantasy_name: joi.string().required().messages({
        'any.required': `"fantasy_name" is a required field`,
        'string.empty': `"fantasy_name" can not be empty`,
      }),
      Address: joi.string().required().messages({
        'any.required': `"Address" is a required field`,
        'string.empty': `"Address" can not be empty`,
      }),
      uf: joi.string().required().messages({
        'any.required': `"uf" is a required field`,
        'string.empty': `"uf" can not be empty`,
      }),
      city: joi.string().required().messages({
        'any.required': `"city" is a required field`,
        'string.empty': `"city" can not be empty`,
      }),
      responsible: joi.string().required().messages({
        'any.required': `"responsible" is a required field`,
        'string.empty': `"responsible" can not be empty`,
      }),
      phone: joi.string().required().messages({
        'any.required': `"phone" is a required field`,
        'string.empty': `"phone" can not be empty`,
      }),
      email: joi.string().email().required().messages({
        'any.required': `"email" is a required field`,
        'string.empty': `"email" can not be empty`,
      }),
      password: joi.string().required().messages({
        'any.required': `"password" is a required field`,
        'string.empty': `"password" can not be empty`,
      }),
    }),
    providerController.ControllerUpdateProvider
  );

  router.route('/provider/:providerid/enable').put(
    autorizacaoMiddleware('ENABLE_PROVIDER'),
    validateDTO('params', {
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
    providerController.ControllerEnableProvider
  );

  router.route('/provider/:providerid/disable').put(
    autorizacaoMiddleware('DISABLE_PROVIDER'),
    validateDTO('params', {
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
    providerController.ControllerDisableProvider
  );

  router.route('/provider/:providerid/likes').get(
    autorizacaoMiddleware('*'),
    validateDTO('params', {
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
    providerController.ControllerSearchLikesReceived
  );

  router.route('/provider/:providerid/product').get(
    autorizacaoMiddleware('*'),
    validateDTO('params', {
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
    providerController.ControllerSearchProductsProvider
  );

  router.route('/provider/:provider/product').post(
    autorizacaoMiddleware('CREATE_PRODUCT'),
    fileUploadMiddleware('products'),
    validateDTO('params', {
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
    validateDTO(
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
  );

  router.route('/provider/:providerid/product/:productid').delete(
    autorizacaoMiddleware('REMOVE_PRODUCT'),
    validateDTO('params', {
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

  router.route('/provider/:providerid/product/:productid/likes').post(
    autorizacaoMiddleware('CREATE_LIKE_PRODUCT'),
    validateDTO('params', {
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
    productController.ControllerCreateLikeProduct
  );

  router.route('/provider/:providerid/product/:productid/likes').delete(
    autorizacaoMiddleware('REMOVE_LIKE_PRODUCT'),
    validateDTO('params', {
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
    productController.ControllerRemoveLikeProduct
  );
};
