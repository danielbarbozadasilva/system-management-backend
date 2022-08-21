const joi = require('joi')
const controllerCategory = require('../../controllers/controllers.category')

const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto')
const middlewareFileUploadMiddleware = require('../../utils/middlewares/middlewares.file_upload')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const asyncMiddleware = require('../../utils/middlewares/middlewares.async')

module.exports = (router) => {
  router
    .route('/category')
    .get(
      asyncMiddleware(authorizationMiddleware('*')),
      asyncMiddleware(controllerCategory.listAllCategoryController)
    )

    .post(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('CREATE_CATEGORY')),
      asyncMiddleware(middlewareFileUploadMiddleware('category', true)),
      asyncMiddleware(
        middlewareValidateDTO(
          'body',
          {
            name: joi.string().required().messages({
              'any.required': '"name" is a required field',
              'string.empty': '"name" can not be empty'
            }),
            description: joi.string().required().messages({
              'any.required': '"description" is a required field',
              'string.empty': '"description" can not be empty'
            })
          },
          {
            allowUnknown: true
          }
        )
      ),
      asyncMiddleware(controllerCategory.createCategoryController)
    )

  router
    .route('/category/:categoryid')
    .get(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('*')),
      asyncMiddleware(
        middlewareValidateDTO('params', {
          categoryid: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              'any.required': '"category id" is a required field',
              'string.empty': '"category id" can not be empty'
            })
        })
      ),
      asyncMiddleware(controllerCategory.listCategoryByIdController)
    )

    .put(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('UPDATE_CATEGORY')),
      asyncMiddleware(middlewareFileUploadMiddleware('category')),
      asyncMiddleware(
        middlewareValidateDTO('params', {
          categoryid: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              'any.required': '"category id" is a required field',
              'string.empty': '"category id" can not be empty',
              'string.regex': '"category id" out of the expected format'
            })
        })
      ),
      asyncMiddleware(
        middlewareValidateDTO(
          'body',
          {
            name: joi.string().required().messages({
              'any.required': '"name" is a required field',
              'string.empty': '"name" can not be empty'
            }),
            description: joi.string().required().messages({
              'any.required': '"description" is a required field',
              'string.empty': '"description" can not be empty'
            })
          },
          {
            allowUnknown: true
          }
        )
      ),
      asyncMiddleware(controllerCategory.updateCategoryController)
    )

    .delete(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('REMOVE_CATEGORY')),
      asyncMiddleware(
        middlewareValidateDTO('params', {
          categoryid: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              'any.required': '"category id" is a required field',
              'string.empty': '"category id" can not be empty',
              'string.regex': '"category id" out of the expected format'
            })
        })
      ),
      asyncMiddleware(controllerCategory.removeCategoryController)
    )

  router.route('/category/:categoryid/product').get(
    asyncMiddleware(authorizationMiddleware('*')),
    asyncMiddleware(
      middlewareValidateDTO('params', {
        categoryid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"category id" is a required field',
            'string.empty': '"category id" can not be empty'
          })
      })
    ),
    asyncMiddleware(controllerCategory.listCategoryByIdProductController)
  )
}
