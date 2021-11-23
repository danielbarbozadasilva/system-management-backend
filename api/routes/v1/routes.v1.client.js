const joi = require('joi').extend(require('@joi/date'));
const clientController = require('../../controllers/controllers.client');

const MiddlewareAsync = require('../../utils/middlewares/middlewares.async');
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto');
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization');

module.exports = (router) => {
  router
    .route('/client')
    .post(
      authorizationMiddleware('*'),
      middlewareValidateDTO('body', {
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
        phone: joi.string().required().messages({
          'any.required': `"phone" is a required field`,
          'string.empty': `"phone" can not be empty`,
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
      clientController.ControllerInsertClients
    )
    .get(
      authorizationMiddleware('*'),
      MiddlewareAsync(clientController.ControllerListAllClients)
    )
    .get(
      authorizationMiddleware('*'),
      middlewareValidateDTO('params', {
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
    ),
    router.route('/provider/:providerid/like').get(
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
      clientController.ControllerSearchLikeProduct
    ),
    router
      .route('/provider/:providerid/client/:client_id/like')
      .post(
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
          client_id: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              'any.required': `" client id" is a required field`,
              'string.empty': `"client id" can not be empty`,
              'string.pattern.base': `"client id" out of the expected format`,
            }),
        }),
        clientController.ControllerInsertLikeProduct
      )
      .delete(
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
          client_id: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              'any.required': `"product id" is a required field`,
              'string.empty': `"product id" can not be empty`,
              'string.pattern.base': `"product id" out of the expected format`,
            }),
        }),
        clientController.ControllerRemoveLikeProvider
      );
};
