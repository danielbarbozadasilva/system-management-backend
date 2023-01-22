const joi = require('joi')
const providerController = require('../../controllers/controllers.provider')
const middlewareValidateDTO = require('../../middlewares/middlewares.validate-dto')
const authenticationMiddleware = require('../../middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../middlewares/middlewares.authorization')
const verifyDbMiddleware = require('../../middlewares/middlewares.verify-exists')

module.exports = (router) => {
  router.route('/provider/filter/:namefilter').get(
    middlewareValidateDTO('params', {
      namefilter: joi.string().allow('')
    }),
    providerController.listAllProvidersController
  )

  router.route('/provider').post(
    middlewareValidateDTO('body', {
      cnpj: joi
        .string()
        .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
        .required()
        .messages({
          'any.required': '"cnpj" is a required field',
          'string.empty': '"cnpj" can not be empty'
        }),
      fantasyName: joi.string().required().messages({
        'any.required': '"fantasy name" is a required field',
        'string.empty': '"fantasy name" can not be empty'
      }),
      socialName: joi.string().required().messages({
        'any.required': '"social name" is a required field',
        'string.empty': '"social name" can not be empty'
      }),
      address: joi.string().required().messages({
        'any.required': '"address" is a required field',
        'string.empty': '"address" can not be empty'
      }),
      uf: joi.string().required().messages({
        'any.required': '"uf" is a required field',
        'string.empty': '"uf" can not be empty'
      }),
      city: joi.string().required().messages({
        'any.required': '"city" is a required field',
        'string.empty': '"city" can not be empty'
      }),
      responsible: joi.string().required().messages({
        'any.required': '"responsible" is a required field',
        'string.empty': '"responsible" can not be empty'
      }),
      phone: joi.string().required().messages({
        'any.required': '"phone" is a required field',
        'string.empty': '"phone" can not be empty'
      }),
      email: joi.string().email().required().messages({
        'any.required': '"email" is a required field',
        'string.empty': '"email" can not be empty'
      }),
      password: joi.string().required().messages({
        'any.required': '"password" is a required field',
        'string.empty': '"password" can not be empty'
      })
    }),
    verifyDbMiddleware.verifyEmailExists,
    verifyDbMiddleware.verifyCnpjExists,
    providerController.insertProviderController
  )

  router.route('/provider/filter/uf/:uf/city/:city').get(
    middlewareValidateDTO('params', {
      uf: joi.string().allow(''),
      city: joi.string().allow('')
    }),
    providerController.listProvidersByLocationController
  )

  router.route('/provider/:providerid').get(
    middlewareValidateDTO('params', {
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
    verifyDbMiddleware.verifyIdProviderDbMiddleware,
    providerController.listProductsByProviderController
  )

  router.route('/provider/:providerid/status/:status').put(
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
      status: joi
        .string()
        .valid('ENABLE', 'DISABLE')
        .insensitive()
        .required()
        .messages({
          'any.required': '"status" is a required field',
          'string.empty': '"status" can not be empty'
        })
    }),
    authenticationMiddleware(),
    authorizationMiddleware('CHANGE_STATUS_PROVIDER'),
    verifyDbMiddleware.verifyIdProviderDbMiddleware,
    providerController.changeStatusProviderController
  )

  router.route('/provider/:providerid/like').get(
    middlewareValidateDTO('params', {
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
    authorizationMiddleware('*'),
    verifyDbMiddleware.verifyIdProviderDbMiddleware,
    providerController.searchLikeProductController
  )

  router
    .route('/provider/:providerid/product/:productid/like')
    .post(
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
      authorizationMiddleware('CREATE_LIKE_PRODUCT'),
      verifyDbMiddleware.verifyIdProductDbMiddleware,
      verifyDbMiddleware.verifyLikeProviderDbMiddleware,
      providerController.createLikeProductController
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
      authorizationMiddleware('REMOVE_LIKE_PRODUCT'),
      verifyDbMiddleware.verifyIdProductDbMiddleware,
      verifyDbMiddleware.verifyProviderLikeNotExistsDbMiddleware,
      providerController.deleteLikeProductController
    )
}
