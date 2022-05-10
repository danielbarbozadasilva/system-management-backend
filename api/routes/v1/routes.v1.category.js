const joi = require('joi')
const controllerCategory = require('../../controllers/controllers.category')

const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto')
const middlewareFileUploadMiddleware = require('../../utils/middlewares/middlewares.file_upload')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const asyncMiddleware = require('../../utils/middlewares/middlewares.async')

module.exports = (router) => {
  router
    .route('/category')
    .get(
      authorizationMiddleware('*'),
      controllerCategory.listAllCategoryController
    )

    .post(
      authorizationMiddleware('CREATE_CATEGORY'),
      asyncMiddleware(middlewareFileUploadMiddleware('category', true)),
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
      ),
      controllerCategory.createCategoryController
    )

  router
    .route('/category/:categoryid/product')
    .get(
      authorizationMiddleware('*'),
      middlewareValidateDTO('params', {
        categoryid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"category id" is a required field',
            'string.empty': '"category id" can not be empty'
          })
      }),
      asyncMiddleware(controllerCategory.listCategoryByIdController)
    )

    .put(
      authorizationMiddleware('UPDATE_CATEGORY'),
      asyncMiddleware(middlewareFileUploadMiddleware('category')),
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
      }),
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
      ),
      controllerCategory.updateCategoryController
    )

    .delete(
      authorizationMiddleware('REMOVE_CATEGORY'),
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
      }),
      asyncMiddleware(controllerCategory.removeCategoryController)
    )
}
