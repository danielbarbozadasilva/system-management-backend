const joi = require("joi");
const validaDTO = require("../../utils/middlewares/validate-dto.middleware");
const fornecedorController = require("../../controllers/fornecedor.controller");
const produtoController = require("../../controllers/produto.controller");
const autorizacaoMiddlewate = require("../../utils/middlewares/authorization.middleware");
const fileUploadMiddleware = require("../../utils/middlewares/fileUploadMiddleware");

module.exports = (router) => {
  router.route("/fornecedor").get(fornecedorController.listAllProviders);

  router
    .route("/fornecedor/filtro")
    .get(fornecedorController.listAllProvidersLocation);

  router.route("/fornecedor/:fornecedorid").get(
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
    fornecedorController.listById
  );

  router.route("/fornecedor").post(
    autorizacaoMiddlewate("ADICIONA_FORNECEDOR"),
    validaDTO("body", {
      cnpj: joi.string().required().messages({
        "any.required": `"cnpj" é um campo obrigatório`,
        "string.empty": `"cnpj" não deve ser vazio`,
      }),
      nomeFantasia: joi.string().required().messages({
        "any.required": `"nomeFantasia" é um campo obrigatório`,
        "string.empty": `"nomeFantasia" não deve ser vazio`,
      }),
      endereco: joi.string().required().messages({
        "any.required": `"endereco" é um campo obrigatório`,
        "string.empty": `"endereco" não deve ser vazio`,
      }),
      uf: joi.string().required().messages({
        "any.required": `"uf" é um campo obrigatório`,
        "string.empty": `"uf" não deve ser vazio`,
      }),
      cidade: joi.string().required().messages({
        "any.required": `"cidade" é um campo obrigatório`,
        "string.empty": `"cidade" não deve ser vazio`,
      }),
      responsavel: joi.string().required().messages({
        "any.required": `"responsavel" é um campo obrigatório`,
        "string.empty": `"responsavel" não deve ser vazio`,
      }),
      telefone: joi.string().required().messages({
        "any.required": `"telefone" é um campo obrigatório`,
        "string.empty": `"telefone" não deve ser vazio`,
      }),
      email: joi.string().email().required().messages({
        "any.required": `"email" é um campo obrigatório`,
        "string.empty": `"email" não deve ser vazio`,
      }),
      senha: joi.string().required().messages({
        "any.required": `"senha" é um campo obrigatório`,
        "string.empty": `"senha" não deve ser vazio`,
      }),
    }),
    fornecedorController.insertProvider
  );

  router.route("/fornecedor/:id").put(
    autorizacaoMiddlewate("ATUALIZAR_FORNECEDOR"),
    validaDTO("params", {
      id: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"fornecedor id" é um campo obrigatório`,
          "string.empty": `"fornecedor id" não deve ser vazio`,
          "string.pattern.base": `"fornecedor id" fora do formato esperado`,
        }),
    }),
    validaDTO("body", {
      cnpj: joi.string().required().messages({
        "any.required": `"cnpj" é um campo obrigatório`,
        "string.empty": `"cnpj" não deve ser vazio`,
      }),
      nomeFantasia: joi.string().required().messages({
        "any.required": `"nomeFantasia" é um campo obrigatório`,
        "string.empty": `"nomeFantasia" não deve ser vazio`,
      }),
      endereco: joi.string().required().messages({
        "any.required": `"endereco" é um campo obrigatório`,
        "string.empty": `"endereco" não deve ser vazio`,
      }),
      uf: joi.string().required().messages({
        "any.required": `"uf" é um campo obrigatório`,
        "string.empty": `"uf" não deve ser vazio`,
      }),
      cidade: joi.string().required().messages({
        "any.required": `"cidade" é um campo obrigatório`,
        "string.empty": `"cidade" não deve ser vazio`,
      }),
      responsavel: joi.string().required().messages({
        "any.required": `"responsavel" é um campo obrigatório`,
        "string.empty": `"responsavel" não deve ser vazio`,
      }),
      telefone: joi.string().required().messages({
        "any.required": `"telefone" é um campo obrigatório`,
        "string.empty": `"telefone" não deve ser vazio`,
      }),
      email: joi.string().email().required().messages({
        "any.required": `"email" é um campo obrigatório`,
        "string.empty": `"email" não deve ser vazio`,
      }),
      senha: joi.string().required().messages({
        "any.required": `"senha" é um campo obrigatório`,
        "string.empty": `"senha" não deve ser vazio`,
      }),
    }),
    fornecedorController.updateProvider
  );

  router.route("/fornecedor/:fornecedorid/ativa").put(
    autorizacaoMiddlewate("ATIVAR_FORNECEDOR"),
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
    fornecedorController.activeProvider
  );

  router.route("/fornecedor/:fornecedorid/inativa").put(
    autorizacaoMiddlewate("INATIVAR_FORNECEDOR"),
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
    fornecedorController.disableProvider
  );

  router.route("/fornecedor/:fornecedorid/curtidas").get(
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
    fornecedorController.searchLikesReceived
  );

  router.route("/fornecedor/:fornecedorid/produto").get(
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
    fornecedorController.searchProductsProvider
  );

  router.route("/fornecedor/:fornecedor/produto").post(
    autorizacaoMiddlewate("CRIA_PRODUTO"),
    fileUploadMiddleware("produtos"),
    validaDTO("params", {
      fornecedor: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"fornecedor id" é um campo obrigatório`,
          "string.empty": `"fornecedor id" não deve ser vazio`,
          "string.pattern.base": `"fornecedor id" fora do formato esperado`,
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
        categoria: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": `"categoria id" é um campo obrigatório`,
            "string.empty": `"categoria id" não deve ser vazio`,
            "string.pattern.base": `"categoria id" fora do formato esperado`,
          }),
        preco: joi.number().required().messages({
          "any.required": `"preco" é um campo obrigatório`,
        }),
      },
      {
        allowUnknown: true,
      }
    ),
    produtoController.inserirProduto
  );

  router.route("/fornecedor/:fornecedorid/produto/:produtoid").delete(
    autorizacaoMiddlewate("REMOVE_PRODUTO"),
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
      produtoid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"fornecedor id" é um campo obrigatório`,
          "string.empty": `"fornecedor id" não deve ser vazio`,
          "string.pattern.base": `"fornecedor id" fora do formato esperado`,
        }),
    }),
    produtoController.removeProduto
  );

  router.route("/fornecedor/:fornecedorid/produto/:produtoid/curtidas").post(
    autorizacaoMiddlewate("CURTIR_PRODUTO"),
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
      produtoid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"fornecedor id" é um campo obrigatório`,
          "string.empty": `"fornecedor id" não deve ser vazio`,
          "string.pattern.base": `"fornecedor id" fora do formato esperado`,
        }),
    }),
    produtoController.curtirProduto
  );

  router.route("/fornecedor/:fornecedorid/produto/:produtoid/curtidas").delete(
    autorizacaoMiddlewate("REMOVE_CURTIDA_PRODUTO"),
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
      produtoid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"fornecedor id" é um campo obrigatório`,
          "string.empty": `"fornecedor id" não deve ser vazio`,
          "string.pattern.base": `"fornecedor id" fora do formato esperado`,
        }),
    }),
    produtoController.removerProdutoCurtidas
  );
};
