const joi = require('joi')
const providerController = require('../../controllers/controllers.provider')
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')

module.exports = (router) => {
  router.route('/provider/filter').get(
    authorizationMiddleware('*'),
    middlewareValidateDTO('query', {
      namefilter: joi.string().optional().messages({
        'any.required': `"name filter" is a required field`,
        'string.empty': `"name filter" can not be empty`
      }),
    }),
    providerController.listAllProvidersController
  )

  router.route('/provider').post(
    authorizationMiddleware('ADD_PROVIDER'),
    middlewareValidateDTO('body', {
      cnpj: joi
        .string()
        .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
        .required()
        .messages({
          'any.required': `"cnpj" is a required field`,
          'string.empty': `"cnpj" can not be empty`
        }),
      fantasyName: joi.string().required().messages({
        'any.required': `"fantasy name" is a required field`,
        'string.empty': `"fantasy name" can not be empty`
      }),
      socialName: joi.string().required().messages({
        'any.required': `"social name" is a required field`,
        'string.empty': `"social name" can not be empty`
      }),
      address: joi.string().required().messages({
        'any.required': `"address" is a required field`,
        'string.empty': `"address" can not be empty`
      }),
      uf: joi.string().required().messages({
        'any.required': `"uf" is a required field`,
        'string.empty': `"uf" can not be empty`
      }),
      city: joi.string().required().messages({
        'any.required': `"city" is a required field`,
        'string.empty': `"city" can not be empty`
      }),
      responsible: joi.string().required().messages({
        'any.required': `"responsible" is a required field`,
        'string.empty': `"responsible" can not be empty`
      }),
      phone: joi.string().required().messages({
        'any.required': `"phone" is a required field`,
        'string.empty': `"phone" can not be empty`
      }),
      email: joi.string().email().required().messages({
        'any.required': `"email" is a required field`,
        'string.empty': `"email" can not be empty`
      }),
      password: joi.string().required().messages({
        'any.required': `"password" is a required field`,
        'string.empty': `"password" can not be empty`
      })
    }),
    providerController.insertProviderController
  )

  router.route('/provider/filter/uf/:uf/city/:city').get(
    authorizationMiddleware('*'),
    middlewareValidateDTO('params', {
      uf: joi.string().messages({
        'any.required': `"uf" is a required field`,
        'string.empty': `"uf" can not be empty`
      }),
      city: joi.string().messages({
        'any.required': `"city" is a required field`,
        'string.empty': `"city" can not be empty`
      })
    }),
    providerController.listProvidersByLocationController
  )

  router
    .route('/provider/:providerid')
    .get(
      authorizationMiddleware('*'),
      middlewareValidateDTO('params', {
        providerid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"provider id" is a required field`,
            'string.empty': `"provider id" can not be empty`,
            'string.pattern.base': `"provider id" out of the expected format`
          })
      }),
      providerController.listProviderByIdController
    )
    .delete(
      authorizationMiddleware('REMOVE_PROVIDER'),
      middlewareValidateDTO('params', {
        providerid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"provider id" is a required field`,
            'string.empty': `"provider id" can not be empty`,
            'string.pattern.base': `"provider id" out of the expected format`
          })
      }),
      providerController.removeProviderController
    )
    .put(
      authorizationMiddleware('UPDATE_PROVIDER'),
      middlewareValidateDTO('params', {
        providerid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"provider id" is a required field`,
            'string.empty': `"provider id" can not be empty`,
            'string.pattern.base': `"provider id" out of the expected format`
          })
      }),
      middlewareValidateDTO('body', {
        cnpj: joi.string().required().messages({
          'any.required': `"cnpj" is a required field`,
          'string.empty': `"cnpj" can not be empty`
        }),
        fantasyName: joi.string().required().messages({
          'any.required': `"fantasy name" is a required field`,
          'string.empty': `"fantasy name" can not be empty`
        }),
        socialName: joi.string().required().messages({
          'any.required': `"social name" is a required field`,
          'string.empty': `"social name" can not be empty`
        }),
        address: joi.string().required().messages({
          'any.required': `"address" is a required field`,
          'string.empty': `"address" can not be empty`
        }),
        uf: joi.string().required().messages({
          'any.required': `"uf" is a required field`,
          'string.empty': `"uf" can not be empty`
        }),
        city: joi.string().required().messages({
          'any.required': `"city" is a required field`,
          'string.empty': `"city" can not be empty`
        }),
        responsible: joi.string().required().messages({
          'any.required': `"responsible" is a required field`,
          'string.empty': `"responsible" can not be empty`
        }),
        phone: joi.string().required().messages({
          'any.required': `"phone" is a required field`,
          'string.empty': `"phone" can not be empty`
        }),
        email: joi.string().email().required().messages({
          'any.required': `"email" is a required field`,
          'string.empty': `"email" can not be empty`
        }),
        password: joi.string().required().messages({
          'any.required': `"password" is a required field`,
          'string.empty': `"password" can not be empty`
        })
      }),
      providerController.updateProviderController
    )

  router.route('/provider/:providerid/product').get(
    authorizationMiddleware('*'),
    middlewareValidateDTO('params', {
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" is a required field`,
          'string.empty': `"provider id" can not be empty`,
          'string.pattern.base': `"provider id" out of the expected format`
        })
    }),
    providerController.listProductsByProviderController
  )

  router.route('/provider/:providerid/:status').put(
    authorizationMiddleware('CHANGE_STATUS_PROVIDER'),
    middlewareValidateDTO('params', {
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" is a required field`,
          'string.empty': `"provider id" can not be empty`,
          'string.pattern.base': `"provider id" out of the expected format`
        }),
      status: joi.string().required().messages({
        'any.required': `"status" is a required field`,
        'string.empty': `"status" can not be empty`
      })
    }),
    providerController.changeStatusProviderController
  )

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
          'string.pattern.base': `"provider id" out of the expected format`
        })
    }),
    providerController.searchLikeProductController
  )

  router
    .route('/provider/:providerid/product/:productid/like')
    .post(
      authorizationMiddleware('CREATE_LIKE_PRODUCT'),
      middlewareValidateDTO('params', {
        providerid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"provider id" is a required field`,
            'string.empty': `"provider id" can not be empty`,
            'string.pattern.base': `"provider id" out of the expected format`
          }),
        productid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"product id" is a required field`,
            'string.empty': `"product id" can not be empty`,
            'string.pattern.base': `"product id" out of the expected format`
          })
      }),
      providerController.insertLikeProductController
    )
    .delete(
      authorizationMiddleware('REMOVE_LIKE_PRODUCT'),
      middlewareValidateDTO('params', {
        providerid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"provider id" is a required field`,
            'string.empty': `"provider id" can not be empty`,
            'string.pattern.base': `"provider id" out of the expected format`
          }),
        productid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"product id" is a required field`,
            'string.empty': `"product id" can not be empty`,
            'string.pattern.base': `"product id" out of the expected format`
          })
      }),
      providerController.deleteLikeProductController
    )
}
