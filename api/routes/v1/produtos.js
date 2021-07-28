const joi = require("joi");
const validaDTO = require("../../utils/middlewares/validate-dto.middleware");
const fileUploadMiddleware = require("../../utils/middlewares/fileUploadMiddleware");
const autorizacaoMiddlewate = require("../../utils/middlewares/authorization.middleware");

const produtoController = require("../../controllers/produto.controller");


module.exports = (router) => {
  router.route("/produto").get(produtoController.listarProdutos)

  router.route("/produto/:id").get(produtoController.listaId);


  router.route("/produto/:produtoid").put(
    fileUploadMiddleware("produtos", true),
    validaDTO("params", {
      produtoid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"produto id" é um campo obrigatório`,
          "string.empty": `"produto id" não deve ser vazio`,
          "string.regex": `"produto id" fora do formato experado`,
        }),
    }),
    validaDTO(
      "body",
      {
        nome: joi.string().required().messages({
          "any.required": `"nome" é um campo obrigatório`,
          "string.empty": `"nome" não deve ser vazio`,
        }),
        descricao: joi.string().required().messages({
          "any.required": `"descricao" é um campo obrigatório`,
          "string.empty": `"descricao" não deve ser vazio`,
        }),
      },
      {
        allowUnknown: true,
      }
    ),
    produtoController.alterarProduto
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

}
