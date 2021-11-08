const joi = require('joi');
const validaDTO = require('../../utils/middlewares/validate-dto.middleware');
const providerController = require('../../controllers/controllers.provider');
const productController = require('../../controllers/controllers.product');
const autorizacaoMiddleware = require('../../utils/middlewares/authorization.middleware');
const fileUploadMiddleware = require('../../utils/middlewares/fileUploadMiddleware');

module.exports = (router) => {
  router.route('/provider').get(providerController.listAllprovider);

  router
    .route('/provider/filtro')
    .get(providerController.listAllproviderLocation);

  router.route('/provider/:providerid').get(
    validaDTO('params', {
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
    autorizacaoMiddleware('ADICIONA_provider'),
    validaDTO('body', {
      cnpj: joi.string().required().messages({
        'any.required': `"cnpj" é um campo obrigatório`,
        'string.empty': `"cnpj" não deve ser vazio`,
      }),
      fantasy_name: joi.string().required().messages({
        'any.required': `"fantasy_name" é um campo obrigatório`,
        'string.empty': `"fantasy_name" não deve ser vazio`,
      }),
      endereco: joi.string().required().messages({
        'any.required': `"endereco" é um campo obrigatório`,
        'string.empty': `"endereco" não deve ser vazio`,
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
      senha: joi.string().required().messages({
        'any.required': `"senha" é um campo obrigatório`,
        'string.empty': `"senha" não deve ser vazio`,
      }),
    }),
    providerController.insertProvider
  );

  router.route('/provider/:id').put(
    autorizacaoMiddleware('ATUALIZAR_provider'),
    validaDTO('params', {
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
    validaDTO('body', {
      cnpj: joi.string().required().messages({
        'any.required': `"cnpj" é um campo obrigatório`,
        'string.empty': `"cnpj" não deve ser vazio`,
      }),
      fantasy_name: joi.string().required().messages({
        'any.required': `"fantasy_name" é um campo obrigatório`,
        'string.empty': `"fantasy_name" não deve ser vazio`,
      }),
      endereco: joi.string().required().messages({
        'any.required': `"endereco" é um campo obrigatório`,
        'string.empty': `"endereco" não deve ser vazio`,
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
      senha: joi.string().required().messages({
        'any.required': `"senha" é um campo obrigatório`,
        'string.empty': `"senha" não deve ser vazio`,
      }),
    }),
    providerController.updateProvider
  );

  router.route('/provider/:providerid/ativa').put(
    autorizacaoMiddleware('ATIVAR_provider'),
    validaDTO('params', {
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
    autorizacaoMiddleware('INATIVAR_provider'),
    validaDTO('params', {
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
    validaDTO('params', {
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
    validaDTO('params', {
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
    autorizacaoMiddleware('CRIAR_product'),
    fileUploadMiddleware('products'),
    validaDTO('params', {
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
    validaDTO(
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
    validaDTO('params', {
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
    validaDTO('params', {
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
    validaDTO('params', {
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
