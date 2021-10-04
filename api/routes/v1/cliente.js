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
					"string.pattern.base": `"cliente id" fora do formato esperado`,
				}),
		}),
		clienteController.pesquisaPorId
	);

	router
		.route("/cliente/:clienteid/fornecedor/:fornecedorid")
		.post(
			autorizacaoMiddlewate("CURTIDA_CRIA"),
			validaDTO("params", {
				clienteid: joi
					.string()
					.regex(/^[0-9a-fA-F]{24}$/)
					.required()
					.messages({
						"any.required": `"cliente id" é um campo obrigatório`,
						"string.empty": `"cliente id" não deve ser vazio`,
						"string.pattern.base": `"cliente id" fora do formato esperado`,
					}),
				fornecedorid: joi
					.string()
					.regex(/^[0-9a-fA-F]{24}$/)
					.required()
					.messages({
						"any.required": `"fornecedor id" é um campo obrigatório`,
						"string.empty": `"fornecedor id" não deve ser vazio`,
						"string.pattern.base": `"fornecedor id" fora do formato esperado`,
					}),
			}),
			clienteController.curtefornecedor
		)

		.delete(
			autorizacaoMiddlewate("CURTIDA_REMOVE"),
			validaDTO("params", {
				fornecedorid: joi
					.string()
					.regex(/^[0-9a-fA-F]{24}$/)
					.required()
					.messages({
						"any.required": `"fornecedor id" é um campo obrigatório`,
						"string.empty": `"fornecedor id" não deve ser vazio`,
						"string.pattern.base": `"fornecedor id" fora do formato esperado`,
					}),
			}),
			clienteController.removeCurtidafornecedor
		);
};
