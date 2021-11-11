const joi = require('joi').extend(require('@joi/date'));
const clientController = require('../../controllers/controllers.client');

const asyncMiddleware = require('../../utils/middlewares/middlewares.async');
const validateDTO = require('../../utils/middlewares/middlewares.validate_dto');
const autorizationMiddleware = require('../../utils/middlewares/middlewares.authorization');

module.exports = (router) => {
  router
    .route('/client')
    .post(
      autorizationMiddleware('*'),
      validateDTO('body', {
        first_name: joi.string().required().messages({
          'any.required': `"first_name" is a required field`,
          'string.empty': `"first_name" can not be empty`,
        }),
        last_name: joi.string().required().messages({
          'any.required': `"last_name" is a required field`,
          'string.empty': `"last_name" can not be empty`,
        }),
        birth_date: joi.string().required().messages({
          'any.required': `"birth_date" is a required field`,
          'string.empty': `"birth_date" can not be empty`,
        }),
        uf: joi.string().required().messages({
          'any.required': `"uf" is a required field`,
          'string.empty': `"uf" can not be empty`,
        }),
        city: joi.string().required().messages({
          'any.required': `"city" is a required field`,
          'string.empty': `"city" can not be empty`,
        }),
        status: joi.string().required().messages({
          'any.required': `"status" is a required field`,
          'string.empty': `"status" can not be empty`,
        }),
      }),
      clientController.ControllerCreateClient
    )

    .get(
      autorizationMiddleware('*'),
      asyncMiddleware(
        MiddlewareAsync(clientController.ControllerListAllClients)
      )
    );

  router.route('/client/:clientid').get(
    autorizationMiddleware('*'),
    validateDTO('params', {
      clientid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"client id" is a required field`,
          'string.empty': `"client id" must not be empty`,
          'string.pattern.base': `"client id" out of the expected format`,
        }),
    }),
    clientController.ControllerListClientById
  );

  router.route('/client/:clientid/likes').get(
    autorizationMiddleware('*'),
    validateDTO('params', {
      clientid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"client id" is a required field`,
          'string.empty': `"client id" must not be empty`,
          'string.pattern.base': `"client id" out of the expected format`,
        }),
    }),
    clientController.ControllerListLikesClient
  );
  router.route('/client/:clientid/provider/:providerid/likes').post(
    autorizationMiddleware('LIKE_CREATE'),
    validateDTO('params', {
      clientid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"client id" is a required field`,
          'string.empty': `"client id" must not be empty`,
          'string.pattern.base': `"client id" out of the expected format`,
        }),
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" is a required field`,
          'string.empty': `"client id" must not be empty`,
          'string.pattern.base': `"client id" out of the expected format`,
        }),
    }),
    clientController.ControllerLikeProvider
  );

  router.route('/client/:clientid/provider/:providerid/likes').delete(
    autorizationMiddleware('LIKE_REMOVE'),
    validateDTO('params', {
      clientid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"client id" is a required field`,
          'string.empty': `"client id" must not be empty`,
          'string.pattern.base': `"client id" out of the expected format`,
        }),
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" is a required field`,
          'string.empty': `"client id" must not be empty`,
          'string.pattern.base': `"client id" out of the expected format`,
        }),
    }),
    clientController.ControllerRemoveLikeProvider
  );
};
