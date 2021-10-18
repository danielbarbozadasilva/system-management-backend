const joi = require("joi");
const validaDTO = require("../../utils/middlewares/validate-dto.middleware");
const fileUploadMiddleware = require("../../utils/middlewares/fileUploadMiddleware");
const autorizacaoMiddlewate = require("../../utils/middlewares/authorization.middleware");
const categoriaController = require("../../controllers/categoria.controller");

module.exports = (router) => {
  router
		.route("/categoria")
		.get(categoriaController.listaTodasAsCategorias)

		.post(
			autorizacaoMiddlewate("CRIA_CATEGORIA"),
			fileUploadMiddleware("categoria"),
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
					status: joi.boolean().required().messages({
						"any.required": `"status" é um campo obrigatório`,
						"booleam.empty": `"status" não deve ser vazio`,
					}),
				},
				{
					allowUnknown: true,
				}
			),
			categoriaController.createCategory
		);

	router
		.route("/categoria/:categoriaid")
		.get(
			validaDTO("params", {
				categoriaid: joi
					.string()
					.regex(/^[0-9a-fA-F]{24}$/)
					.required()
					.messages({
						"any.required": `"categoria id" é um campo obrigatório`,
						"string.empty": `"categoria id" não deve ser vazio`,
					}),
			}),
			categoriaController.buscarPorId
		)

		.put(
			autorizacaoMiddlewate("ALTERA_CATEGORIA"),
			fileUploadMiddleware("categoria", true),
			validaDTO("params", {
				categoriaid: joi
					.string()
					.regex(/^[0-9a-fA-F]{24}$/)
					.required()
					.messages({
						"any.required": `"categoria id" é um campo obrigatório`,
						"string.empty": `"categoria id" não deve ser vazio`,
						"string.regex": `"categoria id" fora do formato esperado`,
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
					status: joi.boolean().required().messages({
						"any.required": `"status" é um campo obrigatório`,
						"booleam.empty": `"status" não deve ser vazio`,
					}),
				},
				{
					allowUnknown: true,
				}
			),
			categoriaController.alterarCategoria
		)
    
		.delete(
			autorizacaoMiddlewate("REMOVE_CATEGORIA"),
			validaDTO("params", {
				categoriaid: joi
					.string()
					.regex(/^[0-9a-fA-F]{24}$/)
					.required()
					.messages({
						"any.required": `"categoria id" é um campo obrigatório`,
						"string.empty": `"categoria id" não deve ser vazio`,
						"string.regex": `"categoria id" fora do formato esperado`,
					}),
			}),
			categoriaController.deletarCategoria
		);

};
