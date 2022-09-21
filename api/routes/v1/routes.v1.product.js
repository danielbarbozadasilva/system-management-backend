const joi = require('joi')
const productController = require('../../controllers/controllers.product')
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate-dto')
const middlewareFileUploadMiddleware = require('../../utils/middlewares/middlewares.file-upload')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const verifyDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')

module.exports = (router) => {
  router.route('/product').get(
    middlewareValidateDTO('query', {
      name: joi.string().allow(null, ''),
      filter: joi.string().allow(null, '')
    }),
    productController.filterProductController
  )

  router
    .route('/provider/:providerid/product/:productid')
    .get(
      middlewareValidateDTO('params', {
        providerid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"provider id" is a required field',
            'string.empty': '"provider id" can not be empty',
            'string.pattern.base': '"provider id" out of the expected format'
          }),
        productid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"product id" is a required field',
            'string.empty': '"product id" can not be empty',
            'string.pattern.base': '"product id" out of the expected format'
          })
      }),
      verifyDbMiddleware.verifyIdProductDbMiddleware,
      productController.listProductByIdController
    )
    .delete(
      middlewareValidateDTO('params', {
        providerid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"provider id" is a required field',
            'string.empty': '"provider id" can not be empty',
            'string.pattern.base': '"provider id" out of the expected format'
          }),
        productid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"product id" is a required field',
            'string.empty': '"product id" can not be empty',
            'string.pattern.base': '"product id" out of the expected format'
          })
      }),
      authenticationMiddleware(),
      authorizationMiddleware('REMOVE_PRODUCT'),
      verifyDbMiddleware.verifyIdProductDbMiddleware,
      productController.removeProductController
    )
    .put(
      middlewareFileUploadMiddleware('products'),
      middlewareValidateDTO('params', {
        providerid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"provider id" is a required field',
            'string.empty': '"provider id" can not be empty',
            'string.pattern.base': '"provider id" out of the expected format'
          }),
        productid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"product id" is a required field',
            'string.empty': '"product id" can not be empty',
            'string.pattern.base': '"product id" out of the expected format'
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
          }),
          category: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              'any.required': '"category id" is a required field',
              'string.empty': '"category id" can not be empty',
              'string.pattern.base': '"category id" out of the expected format'
            }),
          price: joi.number().required().messages({
            'any.required': '"preco" is a required field'
          })
        },
        {
          allowUnknown: true
        }
      ),
      authenticationMiddleware(),
      authorizationMiddleware('UPDATE_PRODUCT'),
      verifyDbMiddleware.verifyIdProductDbMiddleware,
      productController.updateProductController
    )

  router.route('/provider/:providerid/product').post(
    middlewareFileUploadMiddleware('products'),
    middlewareValidateDTO('params', {
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"product id" is a required field',
          'string.empty': '"product id" can not be empty',
          'string.pattern.base': '"product id" out of the expected format'
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
        }),
        category: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"category id" is a required field',
            'string.empty': '"category id" can not be empty',
            'string.pattern.base': '"category id" out of the expected format'
          }),
        price: joi.number().required().messages({
          'any.required': '"preco" is a required field'
        })
      },
      {
        allowUnknown: true
      }
    ),
    authenticationMiddleware(),
    authorizationMiddleware('CREATE_PRODUCT'),
    verifyDbMiddleware.verifyIdProviderDbMiddleware,
    productController.insertProductController
  )
}
