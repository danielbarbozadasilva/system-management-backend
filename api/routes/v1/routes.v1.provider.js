const joi = require('joi');
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto');
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization');
const providerController = require('../../controllers/controllers.provider');

module.exports = (router) => {
  router
    .route('/provider')
    .get(
      authorizationMiddleware('*'),
      providerController.ControllerListAllProviders
    )
    .post(
      authorizationMiddleware('ADD_PROVIDER'),
      middlewareValidateDTO('body', {
        cnpj: joi.string().required().messages({
          'any.required': `"cnpj" is a required field`,
          'string.empty': `"cnpj" can not be empty`,
        }),
        fantasy_name: joi.string().required().messages({
          'any.required': `"fantasy_name" is a required field`,
          'string.empty': `"fantasy_name" can not be empty`,
        }),
        social_name: joi.string().required().messages({
          'any.required': `"social_name" is a required field`,
          'string.empty': `"social_name" can not be empty`,
        }),
        address: joi.string().required().messages({
          'any.required': `"address" is a required field`,
          'string.empty': `"address" can not be empty`,
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
    .route('/provider/filter/:uf/:city')
    .get(
      authorizationMiddleware('*'),
      providerController.ControllerListProvidersByLocation
    );

  router.route('/provider/:providerid').get(
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
    providerController.ControllerListProviderById
  );

  router.route('/provider/:id').put(
    authorizationMiddleware('UPDATE_PROVIDER'),
    middlewareValidateDTO('params', {
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
    middlewareValidateDTO('body', {
      cnpj: joi.string().required().messages({
        'any.required': `"cnpj" is a required field`,
        'string.empty': `"cnpj" can not be empty`,
      }),
      fantasy_name: joi.string().required().messages({
        'any.required': `"fantasy_name" is a required field`,
        'string.empty': `"fantasy_name" can not be empty`,
      }),
      social_name: joi.string().required().messages({
        'any.required': `"social_name" is a required field`,
        'string.empty': `"social_name" can not be empty`,
      }),
      address: joi.string().required().messages({
        'any.required': `"address" is a required field`,
        'string.empty': `"address" can not be empty`,
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

  router.route('/provider/:providerid/:status').put(
    authorizationMiddleware('CHANGE_PROVIDER'),
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
      status: joi
        .string()
        .required()
        .messages({
          'any.required': `"status" is a required field`,
          'string.empty': `"status" can not be empty`,
        }),
    }),
    providerController.ControllerChangeStatusProvider
  );
}