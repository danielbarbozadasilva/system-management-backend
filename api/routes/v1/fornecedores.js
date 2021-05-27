const joi = require('joi');
const validaDTO = require('../../utils/middlewares/validate-dto.middleware');
const fornecedorController = require('../../controllers/fornecedor.controller');

module.exports = (router) => {

  router.route('/fornecedor').get(fornecedorController.lista)
    .post(
      validaDTO('body', {
        cnpj: joi.string().required().messages({
          'any.required': `"cnpj" é um campo obrigatório`,
          'string.empty': `"cnpj" não deve ser vazio`,
        }),
        nomeFantasia: joi.string().required().messages({
          'any.required': `"nomeFantasia" é um campo obrigatório`,
          'string.empty': `"nomeFantasia" não deve ser vazio`,
        }),
        responsavel: joi.string().required().messages({
            'any.required': `"responsavel" é um campo obrigatório`,
            'string.empty': `"responsavel" não deve ser vazio`,
          }),
        // Responsável pelo fornecedor
        endereco: joi.string().required().messages({
          'any.required': `"endereco" é um campo obrigatório`,
          'string.empty': `"endereco" não deve ser vazio`,
        }),
        uf: joi.string().required().messages({
          'any.required': `"uf" é um campo obrigatório`,
          'string.empty': `"uf" não deve ser vazio`,
        }),
        cidade: joi.string().required().messages({
          'any.required': `"cidade" é um campo obrigatório`,
          'string.empty': `"cidade" não deve ser vazio`,
        }),
        telefone: joi.string().required().messages({
          'any.required': `"telefone" é um campo obrigatório`,
          'string.empty': `"telefone" não deve ser vazio`,
        }),
        email: joi.string().email().required().messages({
          'any.required': `"email" é um campo obrigatório`,
          'string.empty': `"email" não deve ser vazio`,
        }),
        senha: joi.string().required().messages({
          'any.required': `"senha" é um campo obrigatório`,
          'string.empty': `"senha" não deve ser vazio`,
        }),
      }),
      fornecedorController.criarFornecedor
    )

    /* Ativa o Fornecedor */
    router.route('/fornecedor/:fornecedorid/ativa').put(
      validaDTO('params', {
        fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"fornecedor id" é um campo obrigatório`,
          'string.empty': `"fornecedor id" não deve ser vazio`,
          'string.pattern.base': `"fornecedor id" fora do formato experado`,
        }),
      }),
      fornecedorController.ativa
    )

  /* Inativa o Fornecedor */
  router.route('/fornecedor/:fornecedorid/inativa').put(
      validaDTO('params', {
        fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"fornecedor id" é um campo obrigatório`,
          'string.empty': `"fornecedor id" não deve ser vazio`,
          'string.pattern.base': `"fornecedor id" fora do formato experado`,
        }),
      }),
      fornecedorController.inativa
    )

}

