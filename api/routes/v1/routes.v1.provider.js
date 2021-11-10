const joi = require('joi');

const validateDTO = require('../../utils/middlewares/middlewares.validate_dto');
const fileUploadMiddleware = require('../../utils/middlewares/middlewares.file_upload');
const autorizationMiddleware = require('../../utils/middlewares/middlewares.authorization');

const providerController = require('../../controllers/controllers.provider');
const productController = require('../../controllers/controllers.product');

module.exports = (router) => {
  router.route('/provider').get(providerController.listAllprovider);

  router
    .route('/provider/filtro')
    .get(providerController.listAllproviderLocation);

  router.route('/provider/:providerid').get(
    validateDTO('params', {
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
    }),
    providerController.listById
  );

  router.route('/provider').post(
    autorizacaoMiddleware('ADD_provider'),
    validateDTO('body', {
      cnpj: joi.string().required().messages({
        'any.required': `"cnpj" é um campo obrigatório`,
        'string.empty': `"cnpj" não deve ser vazio`,
      }),
      fantasy_name: joi.string().required().messages({
        'any.required': `"fantasy_name" é um campo obrigatório`,
        'string.empty': `"fantasy_name" não deve ser vazio`,
      }),
      Address: joi.string().required().messages({
        'any.required': `"Address" é um campo obrigatório`,
        'string.empty': `"Address" não deve ser vazio`,
      }),
      uf: joi.string().required().messages({
        'any.required': `"uf" é um campo obrigatório`,
        'string.empty': `"uf" não deve ser vazio`,
      }),
      cidade: joi.string().required().messages({
        'any.required': `"cidade" é um campo obrigatório`,
        'string.empty': `"cidade" não deve ser vazio`,
      }),
      responsavel: joi.string().required().messages({
        'any.required': `"responsavel" é um campo obrigatório`,
        'string.empty': `"responsavel" não deve ser vazio`,
      }),
      telefone: joi.string().required().messages({
        'any.required': `"telefone" é um campo obrigatório`,
        'string.empty': `"telefone" não deve ser vazio`,
      }),
      email: joi.string().email().required().messages({
        'any.required': `"email" é um campo obrigatório`,
        'string.empty': `"email" não deve ser vazio`,
      }),
      password: joi.string().required().messages({
        'any.required': `"password" é um campo obrigatório`,
        'string.empty': `"password" não deve ser vazio`,
      }),
    }),
    providerController.insertProvider
  );

  router.route('/provider/:id').put(
    autorizacaoMiddleware('UPDATE_provider'),
    validateDTO('params', {
      id: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
    }),
    validateDTO('body', {
      cnpj: joi.string().required().messages({
        'any.required': `"cnpj" é um campo obrigatório`,
        'string.empty': `"cnpj" não deve ser vazio`,
      }),
      fantasy_name: joi.string().required().messages({
        'any.required': `"fantasy_name" é um campo obrigatório`,
        'string.empty': `"fantasy_name" não deve ser vazio`,
      }),
      Address: joi.string().required().messages({
        'any.required': `"Address" é um campo obrigatório`,
        'string.empty': `"Address" não deve ser vazio`,
      }),
      uf: joi.string().required().messages({
        'any.required': `"uf" é um campo obrigatório`,
        'string.empty': `"uf" não deve ser vazio`,
      }),
      cidade: joi.string().required().messages({
        'any.required': `"cidade" é um campo obrigatório`,
        'string.empty': `"cidade" não deve ser vazio`,
      }),
      responsavel: joi.string().required().messages({
        'any.required': `"responsavel" é um campo obrigatório`,
        'string.empty': `"responsavel" não deve ser vazio`,
      }),
      telefone: joi.string().required().messages({
        'any.required': `"telefone" é um campo obrigatório`,
        'string.empty': `"telefone" não deve ser vazio`,
      }),
      email: joi.string().email().required().messages({
        'any.required': `"email" é um campo obrigatório`,
        'string.empty': `"email" não deve ser vazio`,
      }),
      password: joi.string().required().messages({
        'any.required': `"password" é um campo obrigatório`,
        'string.empty': `"password" não deve ser vazio`,
      }),
    }),
    providerController.updateProvider
  );

  router.route('/provider/:providerid/ativa').put(
    autorizacaoMiddleware('ACTIVE_provider'),
    validateDTO('params', {
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
    }),
    providerController.activeProvider
  );

  router.route('/provider/:providerid/inativa').put(
    autorizacaoMiddleware('INACTIVATE_provider'),
    validateDTO('params', {
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
    }),
    providerController.disableProvider
  );

  router.route('/provider/:providerid/likes').get(
    validateDTO('params', {
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
    }),
    providerController.searchLikesReceived
  );

  router.route('/provider/:providerid/product').get(
    validateDTO('params', {
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
    }),
    providerController.searchProductsProvider
  );

  router.route('/provider/:provider/product').post(
    autorizacaoMiddleware('CREATE_product'),
    fileUploadMiddleware('products'),
    validateDTO('params', {
      provider: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
    }),
    validateDTO(
      'body',
      {
        name: joi.string().required().messages({
          'any.required': `"name" é um campo obrigatório`,
          'string.empty': `"name" não deve ser vazio`,
        }),
        description: joi.string().required().messages({
          'any.required': `"description" é um campo obrigatório`,
          'string.empty': `"description" não deve ser vazio`,
        }),
        category: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"category id" é um campo obrigatório`,
            'string.empty': `"category id" não deve ser vazio`,
            'string.pattern.base': `"category id" fora do formato esperado`,
          }),
        preco: joi.number().required().messages({
          'any.required': `"preco" é um campo obrigatório`,
        }),
      },
      {
        allowUnknown: true,
      }
    ),
    productController.inserirproduct
  );

  router.route('/provider/:providerid/product/:productid').delete(
    autorizacaoMiddleware('REMOVE_product'),
    validateDTO('params', {
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
      productid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
    }),
    productController.removeproduct
  );

  router.route('/provider/:providerid/product/:productid/likes').post(
    autorizacaoMiddleware('CURTIR_product'),
    validateDTO('params', {
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
      productid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
    }),
    productController.curtirproduct
  );

  router.route('/provider/:providerid/product/:productid/likes').delete(
    autorizacaoMiddleware('REMOVE_like_product'),
    validateDTO('params', {
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
      productid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
    }),
    productController.removerproductlikes
  );
};
