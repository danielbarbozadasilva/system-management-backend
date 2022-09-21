const joi = require('joi').extend(require('@joi/date'))
const clientController = require('../../controllers/controllers.client')
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate-dto')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const verifyDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')

module.exports = (router) => {
  router.route('/client/:clientid').get(
    middlewareValidateDTO('params', {
      clientid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"client id" is a required field',
          'string.empty': '"client id" must not be empty',
          'string.pattern.base': '"client id" out of the expected format'
        })
    }),
    authenticationMiddleware(),
    authorizationMiddleware('CLIENT_SEARCH_ID'),
    verifyDbMiddleware.verifyIdClientDbMiddleware,
    clientController.listClientByIdController
  ),
    router
      .route('/client')
      .get(
        authenticationMiddleware(),
        authorizationMiddleware('CLIENT_SEARCH'),
        clientController.listAllClientsController
      )

      .post(
        middlewareValidateDTO('body', {
          firstName: joi.string().required().messages({
            'any.required': '"first name" is a required field',
            'string.empty': '"first name" can not be empty'
          }),
          lastName: joi.string().required().messages({
            'any.required': '"last name" is a required field',
            'string.empty': '"last name" can not be empty'
          }),
          birthDate: joi.date(),
          uf: joi.string().required().messages({
            'any.required': '"uf" is a required field',
            'string.empty': '"uf" can not be empty'
          }),
          city: joi.string().required().messages({
            'any.required': '"city" is a required field',
            'string.empty': '"city" can not be empty'
          }),
          phone: joi.string().required().messages({
            'any.required': '"phone" is a required field',
            'string.empty': '"phone" can not be empty'
          }),
          email: joi.string().required().messages({
            'any.required': '"email" is a required field',
            'string.empty': '"email" can not be empty'
          }),
          password: joi.string().required().messages({
            'any.required': '"password" is a required field',
            'string.empty': '"password" can not be empty'
          }),
          auth: joi.boolean().optional()
        }),
        verifyDbMiddleware.verifyEmailExists,
        clientController.insertClientsController
      ),
    router.route('/client/:clientid/like').get(
      middlewareValidateDTO('params', {
        clientid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"client id" is a required field',
            'string.empty': '"client id" can not be empty',
            'string.pattern.base': '"client id" out of the expected format'
          })
      }),
      authenticationMiddleware(),
      verifyDbMiddleware.verifyIdClientDbMiddleware,
      clientController.listLikeClientController
    ),
    router
      .route('/client/:clientid/provider/:providerid/like')
      .post(
        middlewareValidateDTO('params', {
          clientid: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              'any.required': '"client id" is a required field',
              'string.empty': '"client id" can not be empty',
              'string.pattern.base': '"client id" out of the expected format'
            }),
          providerid: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              'any.required': '"provider id" is a required field',
              'string.empty': '"provider id" can not be empty',
              'string.pattern.base': '"provider id" out of the expected format'
            })
        }),
        authenticationMiddleware(),
        authorizationMiddleware('CLIENT_LIKE_CREATE'),
        verifyDbMiddleware.verifyIdClientDbMiddleware,
        verifyDbMiddleware.verifyIdProviderDbMiddleware,
        verifyDbMiddleware.verifyLikeClientDbMiddleware,
        clientController.createLikeController
      )
      .delete(
        middlewareValidateDTO('params', {
          clientid: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              'any.required': '"client id" is a required field',
              'string.empty': '"client id" can not be empty',
              'string.pattern.base': '"client id" out of the expected format'
            }),
          providerid: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              'any.required': '"provider id" is a required field',
              'string.empty': '"provider id" can not be empty',
              'string.pattern.base': '"provider id" out of the expected format'
            })
        }),
        authenticationMiddleware(),
        authorizationMiddleware('CLIENT_LIKE_REMOVE'),
        verifyDbMiddleware.verifyIdClientDbMiddleware,
        verifyDbMiddleware.verifyIdProviderDbMiddleware,
        verifyDbMiddleware.verifyClientLikeNotExistsDbMiddleware,
        clientController.removeLikeController
      )
}
