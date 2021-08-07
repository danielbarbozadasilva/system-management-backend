const joi = require("joi").extend(require("@joi/date"));
const validaDTO = require("../../utils/middlewares/validate-dto.middleware");
const clienteController = require("../../controllers/cliente.controller");
const asyncMiddleware = require("../../utils/middlewares/async-middleware");
const autorizacaoMiddlewate = require("../../utils/middlewares/authorization.middleware");

module.exports = (router) => {
  router
    .route("/cliente")
    .post(clienteController.cria)
    
    .get(asyncMiddleware(clienteController.listarTodosClientes));

  router.route("/cliente/:clienteid").get(
    validaDTO("params", {
      clienteid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"cliente id" é um campo obrigatório`,
          "string.empty": `"cliente id" não deve ser vazio`,
          "string.pattern.base": `"cliente id" fora do formato experado`,
        }),
    }),
    clienteController.pesquisaPorId
  );
};
