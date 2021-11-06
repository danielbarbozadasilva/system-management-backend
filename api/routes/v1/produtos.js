const joi = require("joi");
const produtoController = require("../../controllers/produto.controller");

const validaDTO = require("../../utils/middlewares/validate-dto.middleware");
const fileUploadMiddleware = require("../../utils/middlewares/fileUploadMiddleware");
const autorizacaoMiddlewate = require("../../utils/middlewares/authorization.middleware");

module.exports = (router) => {
  router.route("/produto").get(produtoController.listarProdutos);

  router.route("/produto/:id").get(produtoController.listaId);

  router.route("/produto/:produtoid").put(
    fileUploadMiddleware("produtos", true),
    validaDTO("query", {
      category: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "any.required": `"category id" é um campo obrigatório`,
          "string.empty": `"category id" não deve ser vazio`,
          "string.pattern.base": `"category id" fora do formato esperado`,
        }),
      fornecedor: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "any.required": `"fornecedor id" é um campo obrigatório`,
          "string.empty": `"fornecedor id" não deve ser vazio`,
          "string.pattern.base": `"fornecedor id" fora do formato esperado`,
        }),

      namelike: joi.string(),
      allowUnknown: true,
    }),
    produtoController.alterarProduto
  );
};
