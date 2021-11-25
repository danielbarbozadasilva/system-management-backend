const joi = require('joi').extend(require('@joi/date'));
const clientController = require('../../controllers/controllers.client');
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto');
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization');

module.exports = (router) => {
  router
    .route('/client/:clientid')
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
    )
    .put(
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
      clientController.ControllerUpdateClients
    )
    .delete(
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
      clientController.ControllerDeleteClients
    ),

  router
    .route('/client')
    .get(
      authorizationMiddleware('*'),
      clientController.ControllerListAllClients
    )

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
      clientController.ControllerInsertClients
    ),
    router.route('/client/:clientid/like').get(
      authorizationMiddleware('*'),
      middlewareValidateDTO('params', {
        clientid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"client id" is a required field`,
            'string.empty': `"client id" can not be empty`,
            'string.pattern.base': `"client id" out of the expected format`,
          }),
      }),
      clientController.ControllerSearchLikeProvider
    ),
    router
      .route('/client/:clientid/provider/:providerid/like')
      .post(
        authorizationMiddleware('*'),
        middlewareValidateDTO('params', {
          clientid: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              'any.required': `"client id" is a required field`,
              'string.empty': `"client id" can not be empty`,
              'string.pattern.base': `"client id" out of the expected format`,
            }),
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
        clientController.ControllerInsertLikeProvider
      )
      .delete(
        authorizationMiddleware('*'),
        clientController.ControllerRemoveLikeProvider
      );
};
