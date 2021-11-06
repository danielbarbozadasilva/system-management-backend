const joi = require("joi");
const validaDTO = require("../../utils/middlewares/validate-dto.middleware");
const fornecedorController = require("../../controllers/fornecedor.controller");
const produtoController = require("../../controllers/produto.controller");
const autorizacaoMiddleware = require("../../utils/middlewares/authorization.middleware");
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
    autorizacaoMiddleware("ADICIONA_FORNECEDOR"),
    validaDTO("body", {
      cnpj: joi.string().required().messages({
        "any.required": `"cnpj" é um campo obrigatório`,
        "string.empty": `"cnpj" não deve ser vazio`,
      }),
      nameFantasia: joi.string().required().messages({
        "any.required": `"nameFantasia" é um campo obrigatório`,
        "string.empty": `"nameFantasia" não deve ser vazio`,
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
    autorizacaoMiddleware("ATUALIZAR_FORNECEDOR"),
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
      nameFantasia: joi.string().required().messages({
        "any.required": `"nameFantasia" é um campo obrigatório`,
        "string.empty": `"nameFantasia" não deve ser vazio`,
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
    autorizacaoMiddleware("ATIVAR_FORNECEDOR"),
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
    autorizacaoMiddleware("INATIVAR_FORNECEDOR"),
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
    autorizacaoMiddleware("CRIAR_PRODUTO"),
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
        name: joi.string().required().messages({
          "any.required": `"name" é um campo obrigatório`,
          "string.empty": `"name" não deve ser vazio`,
        }),
        description: joi.string().required().messages({
          "any.required": `"description" é um campo obrigatório`,
          "string.empty": `"description" não deve ser vazio`,
        }),
        category: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": `"category id" é um campo obrigatório`,
            "string.empty": `"category id" não deve ser vazio`,
            "string.pattern.base": `"category id" fora do formato esperado`,
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
    autorizacaoMiddleware("REMOVE_PRODUTO"),
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
    autorizacaoMiddleware("CURTIR_PRODUTO"),
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
    autorizacaoMiddleware("REMOVE_CURTIDA_PRODUTO"),
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
