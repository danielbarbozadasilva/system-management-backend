const joi = require('joi')
const controllerCategory = require('../../controllers/controllers.category')

const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate-dto')
const middlewareFileUploadMiddleware = require('../../utils/middlewares/middlewares.file-upload')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const verifyDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')

module.exports = (router) => {
  router
    .route('/category')
    .get(
      authorizationMiddleware('*'),
      controllerCategory.listAllCategoryController
    )

    .post(
      authenticationMiddleware(),
      authorizationMiddleware('CREATE_CATEGORY'),
      middlewareFileUploadMiddleware('category', true),
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
    .route('/category/:categoryid')
    .get(
      authenticationMiddleware(),
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
      verifyDbMiddleware.verifyIdCategoryDbMiddleware,
      controllerCategory.listCategoryByIdController
    )

    .put(
      authenticationMiddleware(),
      authorizationMiddleware('UPDATE_CATEGORY'),
      middlewareFileUploadMiddleware('category'),
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
      verifyDbMiddleware.verifyIdCategoryDbMiddleware,
      controllerCategory.updateCategoryController
    )

    .delete(
      authenticationMiddleware(),
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
      verifyDbMiddleware.verifyIdCategoryDbMiddleware,
      controllerCategory.removeCategoryController
    )

  router.route('/category/:categoryid/product').get(
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
    verifyDbMiddleware.verifyIdCategoryDbMiddleware,
    controllerCategory.listCategoryByIdProductController
  )
}
