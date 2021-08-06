const joi = require("joi").extend(require("@joi/date"));
const validaDTO = require("../../utils/middlewares/validate-dto.middleware");
const clienteController = require("../../controllers/cliente.controller");
const asyncMiddleware = require("../../utils/middlewares/async-middleware");
const autorizacaoMiddlewate = require("../../utils/middlewares/authorization.middleware");

module.exports = (router) => {
  router
    .route("/cliente")
    .post(
      asyncMiddleware(
        validaDTO("body", {
          nome: joi.string().required().messages({
            "any.required": `"nome" é um campo obrigatório`,
            "string.empty": `"nome" não deve ser vazio`,
          }),

          nascimento: joi.date().format("DD/MM/YYYY").required().messages({
            "any.required": `"nascimento" é um campo obrigatório`,
            "date.format": `"nascimento" deve ser uma data válida "{#format}"`,
          }),

          uf: joi.string().required().messages({
            "any.required": `"uf" é um campo obrigatório`,
            "string.empty": `"uf" não deve ser vazio`,
          }),
          cidade: joi.string().required().messages({
            "any.required": `"cidade" é um campo obrigatório`,
            "string.empty": `"cidade" não deve ser vazio`,
          }),
          email: joi.string().email().required().messages({
            "any.required": `"email" é um campo obrigatório`,
            "string.empty": `"email" não deve ser vazio`,
          }),
          senha: joi.string().required().messages({
            "any.required": `"senha" é um campo obrigatório`,
            "string.empty": `"senha" não deve ser vazio`,
          }),
        })
      ),
      asyncMiddleware(clienteController.cria)
    )
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
