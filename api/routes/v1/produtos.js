const joi = require("joi");
const validaDTO = require("../../utils/middlewares/validate-dto.middleware");
const fileUploadMiddleware = require("../../utils/middlewares/fileUploadMiddleware");
const autorizacaoMiddlewate = require("../../utils/middlewares/authorization.middleware");

const produtoController = require("../../controllers/produto.controller");

module.exports = (router) => {
	router.route("/produto").get(produtoController.listarProdutos);

	router.route("/produto/:id").get(produtoController.listaId);

	router.route("/produto/:produtoid").put(
		fileUploadMiddleware("produtos", true),
		validaDTO("query", {
			categoria: joi
				.string()
				.regex(/^[0-9a-fA-F]{24}$/)
				.messages({
					"any.required": `"categoria id" é um campo obrigatório`,
					"string.empty": `"categoria id" não deve ser vazio`,
					"string.pattern.base": `"categoria id" fora do formato esperado`,
				}),
			fornecedor: joi
				.string()
				.regex(/^[0-9a-fA-F]{24}$/)
				.messages({
					"any.required": `"fornecedor id" é um campo obrigatório`,
					"string.empty": `"fornecedor id" não deve ser vazio`,
					"string.pattern.base": `"fornecedor id" fora do formato esperado`,
				}),

			nomelike: joi.string(),
			allowUnknown: true,
		}),
		produtoController.alterarProduto
	);
};
