const joi = require('joi').extend(require('@joi/date'));
const clientController = require('../../controllers/controllers.client');

const validaDTO = require('../../utils/middlewares/validate-dto.middleware');
const asyncMiddleware = require('../../utils/middlewares/async-middleware');
const autorizacaoMiddlewate = require('../../utils/middlewares/authorization.middleware');

module.exports = (router) => {
  router
    .route('/client')
    .post(autorizacaoMiddlewate('*'), clientController.cria)

    .get(asyncMiddleware(clientController.listarTodosclients));

  router.route('/client/:clientid').get(
    validaDTO('params', {
      clientid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"client id" é um campo obrigatório`,
          'string.empty': `"client id" não deve ser vazio`,
          'string.pattern.base': `"client id" fora do formato esperado`,
        }),
    }),
    clientController.pesquisaPorId
  );

  router.route('/client/:clientid/likes').get(
    validaDTO('params', {
      clientid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"client id" é um campo obrigatório`,
          'string.empty': `"client id" não deve ser vazio`,
          'string.pattern.base': `"client id" fora do formato esperado`,
        }),
    }),
    clientController.listarlikesprovider
  );
  router.route('/client/:clientid/provider/:providerid/likes').post(
    autorizacaoMiddlewate('like_CRIA'),
    validaDTO('params', {
      clientid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"client id" é um campo obrigatório`,
          'string.empty': `"client id" não deve ser vazio`,
          'string.pattern.base': `"client id" fora do formato esperado`,
        }),
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
    }),
    clientController.curteprovider
  );

  router.route('/client/:clientid/provider/:providerid/likes').delete(
    autorizacaoMiddlewate('like_REMOVE'),
    validaDTO('params', {
      clientid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"client id" é um campo obrigatório`,
          'string.empty': `"client id" não deve ser vazio`,
          'string.pattern.base': `"client id" fora do formato esperado`,
        }),
      providerid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': `"provider id" é um campo obrigatório`,
          'string.empty': `"provider id" não deve ser vazio`,
          'string.pattern.base': `"provider id" fora do formato esperado`,
        }),
    }),
    clientController.removelikeprovider
  );
};
