const joi = require('joi')
const productController = require('../../controllers/controllers.product')
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto')
const middlewareFileUploadMiddleware = require('../../utils/middlewares/middlewares.file_upload')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const asyncMiddleware = require('../../utils/middlewares/middlewares.async')

module.exports = (router) => {
  router.route('/product').get(
    asyncMiddleware(authorizationMiddleware('*')),
    asyncMiddleware(
      middlewareValidateDTO('query', {
        name: joi.string().allow(null, '').max(500),
        filter: joi.string().allow('')
      })
    ),
    asyncMiddleware(productController.filterProductController)
  )

  router.route('/product/:productid').get(
    asyncMiddleware(authorizationMiddleware('*')),
    asyncMiddleware(
      middlewareValidateDTO('params', {
        productid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"provider id" is a required field',
            'string.empty': '"provider id" can not be empty',
            'string.pattern.base': '"provider id" out of the expected format'
          })
      })
    ),
    asyncMiddleware(productController.listProductByIdController)
  )

  router
    .route('/provider/:providerid/product/:productid')
    .put(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('UPDATE_PRODUCT')),
      asyncMiddleware(middlewareFileUploadMiddleware('products')),
      asyncMiddleware(
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
            }),
            category: joi
              .string()
              .regex(/^[0-9a-fA-F]{24}$/)
              .required()
              .messages({
                'any.required': '"category id" is a required field',
                'string.empty': '"category id" can not be empty',
                'string.pattern.base':
                  '"category id" out of the expected format'
              }),
            price: joi.number().required().messages({
              'any.required': '"preco" is a required field'
            })
          },
          {
            allowUnknown: true
          }
        )
      ),
      asyncMiddleware(productController.updateProductController)
    )
    .delete(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('REMOVE_PRODUCT')),
      asyncMiddleware(
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
        })
      ),
      asyncMiddleware(productController.removeProductController)
    )

  router.route('/provider/:providerid/product').post(
    asyncMiddleware(authenticationMiddleware()),
    asyncMiddleware(authorizationMiddleware('CREATE_PRODUCT')),
    asyncMiddleware(middlewareFileUploadMiddleware('products')),
    asyncMiddleware(
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
      )
    ),
    asyncMiddleware(productController.insertProductController)
  )
}
