const joi = require('joi').extend(require('@joi/date'));
const clientController = require('../../controllers/controllers.client');

const asyncMiddleware = require('../../utils/middlewares/middlewares.async');
const validateDTO = require('../../utils/middlewares/middlewares.validate_dto');
const autorizationMiddleware = require('../../utils/middlewares/middlewares.authorization');

module.exports = (router) => {
  router
    .route('/client')
    .post(autorizationMiddleware('*'), clientController.ControllerCreateClient)

    .get(
      asyncMiddleware(
        MiddlewareAsync(clientController.ControllerListAllClients)
      )
    );

  router.route('/client/:clientid').get(
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
    autorizationMiddleware('like_create'),
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
    autorizationMiddleware('like_REMOVE'),
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
