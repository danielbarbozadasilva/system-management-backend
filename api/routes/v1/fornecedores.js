const joi = require('joi');
const validaDTO = require('../../utils/middlewares/validate-dto.middleware');
const fornecedorController = require('../../controllers/fornecedor.controller');
const produtoController = require('../../controllers/produto.controller');
const autorizacaoMiddlewate = require('../../utils/middlewares/authorization.middleware');
const fileUploadMiddleware = require('../../utils/middlewares/fileUploadMiddleware');

const middleTeste = (req, res, next) => {
  console.log('------------------'+JSON.stringify(req.body))
  next()

}


module.exports = (router) => {

  // Listar todos os Fornecedores
  router.route('/fornecedor').get(fornecedorController.lista)

  // Listar Fornecedor por ID
  router.route('/fornecedor/:fornecedorid')
    .get(
      autorizacaoMiddlewate('PESQUISA_FORNECEDOR_ID'),

      validaDTO('params', {
        fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"fornecedor id" é um campo obrigatório`,
          'string.empty': `"fornecedor id" não deve ser vazio`,
          'string.pattern.base': `"fornecedor id" fora do formato experado`,
        }),
      }),
      fornecedorController.buscaPorId,
    )


  // Inserir um Fornecedor
  router.route('/fornecedor').post(
    middleTeste,
    validaDTO('body', {
      cnpj: joi.string().required().messages({
        'any.required': `"cnpj" é um campo obrigatório`,
        'string.empty': `"cnpj" não deve ser vazio`,
      }),
      nomeFantasia: joi.string().required().messages({
        'any.required': `"nomeFantasia" é um campo obrigatório`,
        'string.empty': `"nomeFantasia" não deve ser vazio`,
      }),
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
      responsavel: joi.string().required().messages({
        'any.required': `"responsavel" é um campo obrigatório`,
        'string.empty': `"responsavel" não deve ser vazio`,
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
    fornecedorController.cria
  )


  router.route('/fornecedor/fornecedorid/curtidas')
    .get(
      // autorizacaoMiddlewate('PESQUISA_FORNECEDOR'),
      validaDTO('params', {
        fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"fornecedor id" é um campo obrigatório`,
          'string.empty': `"fornecedor id" não deve ser vazio`,
          'string.pattern.base': `"fornecedor id" fora do formato experado`,
        }),
      }),
      fornecedorController.curtidasRecebidas,
    )
    .post(validaDTO('params', {
      fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': `"cliente id" é um campo obrigatório`,
        'string.empty': `"cliente id" não deve ser vazio`,
        'string.pattern.base': `"cliente id" fora do formato experado`,
      }),
    }),
      fornecedorController.recebeCurtidas,
    )


  // Atualizar o status do Fornecedor para Ativo
  router.route('/fornecedor/:fornecedorid/ativa').put(
    autorizacaoMiddlewate('ATIVAR_FORNECEDOR'),
    validaDTO('params', {
      fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': `"fornecedor id" é um campo obrigatório`,
        'string.empty': `"fornecedor id" não deve ser vazio`,
        'string.pattern.base': `"fornecedor id" fora do formato experado`,
      }),
    }),
    fornecedorController.ativa,
  )

  // Atualizar o status do Fornecedor para Inativo
  router.route('/fornecedor/:fornecedorid/inativa').put(
    autorizacaoMiddlewate('INATIVAR_FORNECEDOR'),
    validaDTO('params', {
      fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': `"fornecedor id" é um campo obrigatório`,
        'string.empty': `"fornecedor id" não deve ser vazio`,
        'string.pattern.base': `"fornecedor id" fora do formato experado`,
      }),
    }),
    fornecedorController.inativa,
  )

  router
    .route('/fornecedor/:fornecedorid/curtidas')
    .get(
      // autorizacaoMiddlewate('PESQUISA_FORNECEDOR'),
      validaDTO('params', {
        fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"fornecedor id" é um campo obrigatório`,
          'string.empty': `"fornecedor id" não deve ser vazio`,
          'string.pattern.base': `"fornecedor id" fora do formato experado`,
        }),
      }),
      fornecedorController.curtidasRecebidas,
    )
    .post(
      autorizacaoMiddlewate('CURTIDA_CRIA'),
      validaDTO('params', {
        fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"fornecedor id" é um campo obrigatório`,
          'string.empty': `"fornecedor id" não deve ser vazio`,
          'string.pattern.base': `"fornecedor id" fora do formato experado`,
        }),
      }),
      fornecedorController.recebeCurtidas,
    )


  router.route('/fornecedor/:fornecedorid/produto')
    .get(
      autorizacaoMiddlewate('PESQUISA_FORNECEDOR_PRODUTO'),
      validaDTO('params', {
        fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"fornecedor id" é um campo obrigatório`,
          'string.empty': `"fornecedor id" não deve ser vazio`,
          'string.pattern.base': `"fornecedor id" fora do formato experado`,
        }),
      }),
      fornecedorController.buscaProdutosPorFornecedor
    )
    .post(
      autorizacaoMiddlewate('CRIA_PRODUTO'),
      fileUploadMiddleware('produtos'),
      validaDTO('params', {
        fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"fornecedor id" é um campo obrigatório`,
          'string.empty': `"fornecedor id" não deve ser vazio`,
          'string.pattern.base': `"fornecedor id" fora do formato experado`,
        }),
      }),
      validaDTO('body', {
        nome: joi.string().required().messages({
          'any.required': `"nome" é um campo obrigatório`,
          'string.empty': `"nome" não deve ser vazio`,
        }),
        descricao: joi.string().required().messages({
          'any.required': `"descricao" é um campo obrigatório`,
          'string.empty': `"descricao" não deve ser vazio`,
        }),
        categoriaid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"categoria id" é um campo obrigatório`,
          'string.empty': `"categoria id" não deve ser vazio`,
          'string.pattern.base': `"categoria id" fora do formato experado`,
        }),
        preco: joi.number().required().messages({
          'any.required': `"preco" é um campo obrigatório`,
        }),
      }, {
        allowUnknown: true,
      }),
      produtoController.cria
    )


  router.route('/fornecedor/:fornecedorid/produto/:produtoid')
    .delete(
      autorizacaoMiddlewate('REMOVE_PRODUTO'),
      validaDTO('params', {
        fornecedorid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"fornecedor id" é um campo obrigatório`,
          'string.empty': `"fornecedor id" não deve ser vazio`,
          'string.pattern.base': `"fornecedor id" fora do formato experado`,
        }),
        produtoid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"fornecedor id" é um campo obrigatório`,
          'string.empty': `"fornecedor id" não deve ser vazio`,
          'string.pattern.base': `"fornecedor id" fora do formato experado`,
        }),
      }),
      produtoController.remove
    )

}




