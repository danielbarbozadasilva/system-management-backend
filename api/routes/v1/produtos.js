const joi = require("joi");
const validaDTO = require("../../utils/middlewares/validate-dto.middleware");
const fileUploadMiddleware = require("../../utils/middlewares/fileUploadMiddleware");
const autorizacaoMiddlewate = require("../../utils/middlewares/authorization.middleware");

const produtoController = require("../../controllers/produto.controller");


module.exports = (router) => {
  router.route("/produto").get(
    validaDTO("query", {
      categoria: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "any.required": `"categoria id" é um campo obrigatório`,
          "string.empty": `"categoria id" não deve ser vazio`,
          "string.pattern.base": `"categoria id" fora do formato experado`,
        }),
      fornecedor: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "any.required": `"fornecedor id" é um campo obrigatório`,
          "string.empty": `"fornecedor id" não deve ser vazio`,
          "string.pattern.base": `"fornecedor id" fora do formato experado`,
        }),
      nomelike: joi.string(),
    }),
    produtoController.listarProdutos
  );

  router.route("/produto/:id").get(
    validaDTO("query", {
      categoriaid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "any.required": `"categoria id" é um campo obrigatório`,
          "string.empty": `"categoria id" não deve ser vazio`,
          "string.pattern.base": `"categoria id" fora do formato experado`,
        }),
      fornecedorid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "any.required": `"fornecedor id" é um campo obrigatório`,
          "string.empty": `"fornecedor id" não deve ser vazio`,
          "string.pattern.base": `"fornecedor id" fora do formato experado`,
        }),
      nomelike: joi.string(),
    }),
    produtoController.listaProdutoPorId
  );


  router.route("/produto").post(
    autorizacaoMiddlewate("INSERIR_PRODUTO"),
    fileUploadMiddleware("produtos", true),
    validaDTO("query", {
      categoriaid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "any.required": `"categoria id" é um campo obrigatório`,
          "string.empty": `"categoria id" não deve ser vazio`,
          "string.pattern.base": `"categoria id" fora do formato experado`,
        }),
      fornecedorid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "any.required": `"fornecedor id" é um campo obrigatório`,
          "string.empty": `"fornecedor id" não deve ser vazio`,
          "string.pattern.base": `"fornecedor id" fora do formato experado`,
        }),
      nomelike: joi.string(),
    }),
    produtoController.inserirProduto
  );

  router.route("/produto/:id").delete(
    autorizacaoMiddlewate("EXCLUIR_PRODUTO"),
    fileUploadMiddleware("produtos", true),

    validaDTO("query", {
      categoriaid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "any.required": `"categoria id" é um campo obrigatório`,
          "string.empty": `"categoria id" não deve ser vazio`,
          "string.pattern.base": `"categoria id" fora do formato experado`,
        }),
      fornecedorid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "any.required": `"fornecedor id" é um campo obrigatório`,
          "string.empty": `"fornecedor id" não deve ser vazio`,
          "string.pattern.base": `"fornecedor id" fora do formato experado`,
        }),
      nomelike: joi.string(),
    }),
    produtoController.removeProduto
  );
};
