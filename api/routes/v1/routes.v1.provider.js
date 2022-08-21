const joi = require('joi')
const providerController = require('../../controllers/controllers.provider')
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const asyncMiddleware = require('../../utils/middlewares/middlewares.async')

module.exports = (router) => {
  router.route('/provider/filter/:namefilter').get(
    asyncMiddleware(authorizationMiddleware('*')),
    asyncMiddleware(
      middlewareValidateDTO('params', {
        namefilter: joi.string().allow('')
      })
    ),
    asyncMiddleware(providerController.listAllProvidersController)
  )

  router.route('/provider').post(
    asyncMiddleware(authorizationMiddleware('*')),
    asyncMiddleware(
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
      })
    ),
    asyncMiddleware(providerController.insertProviderController)
  )

  router.route('/provider/filter/uf/:uf/city/:city').get(
    asyncMiddleware(authorizationMiddleware('*')),
    asyncMiddleware(
      middlewareValidateDTO('params', {
        uf: joi.string().messages({
          'any.required': '"uf" is a required field',
          'string.empty': '"uf" can not be empty'
        }),
        city: joi.string().messages({
          'any.required': '"city" is a required field',
          'string.empty': '"city" can not be empty'
        })
      })
    ),
    asyncMiddleware(providerController.listProvidersByLocationController)
  )

  router
    .route('/provider/:providerid')
    .get(
      asyncMiddleware(authorizationMiddleware('*')),
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
            })
        })
      ),
      asyncMiddleware(providerController.listProductsByProviderController)
    )
    .put(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('*')),
      asyncMiddleware(
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
        })
      ),
      asyncMiddleware(providerController.updateProviderController)
    )

    .delete(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('REMOVE_PROVIDER')),
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
            })
        })
      ),
      asyncMiddleware(providerController.removeProviderController)
    )

  router.route('/provider/:providerid/status/:status').put(
    asyncMiddleware(authenticationMiddleware()),
    asyncMiddleware(authorizationMiddleware('CHANGE_STATUS_PROVIDER')),
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
        status: joi.string().required().messages({
          'any.required': '"status" is a required field',
          'string.empty': '"status" can not be empty'
        })
      })
    ),
    asyncMiddleware(providerController.changeStatusProviderController)
  )

  router.route('/provider/:providerid/like').get(
    asyncMiddleware(authenticationMiddleware()),
    asyncMiddleware(authorizationMiddleware('*')),
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
          })
      })
    ),
    asyncMiddleware(providerController.searchLikeProductController)
  )

  router
    .route('/provider/:providerid/product/:productid/like')
    .post(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('CREATE_LIKE_PRODUCT')),
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
      asyncMiddleware(providerController.insertLikeProductController)
    )
    .delete(
      asyncMiddleware(authenticationMiddleware()),
      asyncMiddleware(authorizationMiddleware('REMOVE_LIKE_PRODUCT')),
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
      asyncMiddleware(providerController.deleteLikeProductController)
    )
}
