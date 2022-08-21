const joi = require('joi').extend(require('@joi/date'))
const clientController = require('../../controllers/controllers.client')
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const asyncMiddleware = require('../../utils/middlewares/middlewares.async')

module.exports = (router) => {
  router
    .route('/client/:clientid')
    .get(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('*')),
      asyncMiddleware(
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
        })
      ),
      asyncMiddleware(clientController.listClientByIdController)
    )
    .put(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('*')),
      asyncMiddleware(
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
        })
      ),
      asyncMiddleware(
        middlewareValidateDTO('body', {
          firstName: joi.string().required().messages({
            'any.required': '"first name" is a required field',
            'string.empty': '"first name" can not be empty'
          }),
          lastName: joi.string().required().messages({
            'any.required': '"last name" is a required field',
            'string.empty': '"last name" can not be empty'
          }),
          birthDate: joi.string().required().messages({
            'any.required': '"birth date" is a required field',
            'string.empty': '"birth date" can not be empty'
          }),
          uf: joi.string().required().messages({
            'any.required': '"uf" is a required field',
            'string.empty': '"uf" can not be empty'
          }),
          city: joi.string().required().messages({
            'any.required': '"city" is a required field',
            'string.empty': '"city" can not be empty'
          }),
          status: joi.string().required().messages({
            'any.required': '"status" is a required field',
            'string.empty': '"status" can not be empty'
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
          })
        })
      ),
      asyncMiddleware(clientController.updateClientsController)
    )
    .delete(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('*')),
      asyncMiddleware(
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
        })
      ),
      asyncMiddleware(clientController.deleteClientsController)
    ),
    router
      .route('/client')
      .get(
        asyncMiddleware(authenticationMiddleware()),
        asyncMiddleware(authorizationMiddleware('*')),
        asyncMiddleware(clientController.listAllClientsController)
      )

      .post(
        asyncMiddleware(authorizationMiddleware('*')),
        asyncMiddleware(
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
          })
        ),
        asyncMiddleware(clientController.insertClientsController)
      ),
    router.route('/client/:clientid/like').get(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('*')),
      asyncMiddleware(
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
        })
      ),
      asyncMiddleware(clientController.listLikeClientController)
    ),
    router
      .route('/client/:clientid/provider/:providerid/like')
      .post(
        asyncMiddleware(authenticationMiddleware()),
        asyncMiddleware(authorizationMiddleware('CLIENT_LIKE_CREATE')),
        asyncMiddleware(
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
                'string.pattern.base':
                  '"provider id" out of the expected format'
              })
          })
        ),
        asyncMiddleware(clientController.createLikeProviderController)
      )
      .delete(
        asyncMiddleware(authenticationMiddleware()),
        asyncMiddleware(authorizationMiddleware('CLIENT_LIKE_REMOVE')),
        asyncMiddleware(
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
                'string.pattern.base':
                  '"provider id" out of the expected format'
              })
          })
        ),
        asyncMiddleware(clientController.removeLikeProviderController)
      )
}
