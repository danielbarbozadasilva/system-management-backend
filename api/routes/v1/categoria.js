const joi = require('joi');
const validaDTO = require('../../utils/middlewares/validate-dto.middleware');
const fileUploadMiddleware = require('../../utils/middlewares/fileUploadMiddleware');
const autorizacaoMiddlewate = require('../../utils/middlewares/authorization.middleware');
const categoriaController = require('../../controllers/categoria.controller');

/* 'router' é um objeto do express que permite maniputar rotas
para uma 'web api', o qual permite ao usuário acessar comandos 
apartir de rotas que representam operações de negócio */
module.exports = (router) => {
   // Listar todas as categoria
  router.route('/categoria').get(categoriaController.listaTodasAsCategorias)
  autorizacaoMiddlewate('PESQUISA_CATEGORIA')
    
  // Inserir uma categoria
    .post(AtualizarautorizacaoMiddlewate('CRIA_CATEGORIA'), fileUploadMiddleware('categoria'),
      /* 'Middleware' responsável por auxiliar no upload do arquivo.
      Apartir deste middleware a aplicação consegue identificar se existe
      um arquivo vinculado a 'request'. O 'middleware' é associado a esta
      rota especifica, passando para ele qual é o destino final das imagens
      que será recebido neste 'endpoint' */
      validaDTO('body', {
        /* Na vadidação de 'DTO', os dados recebidos são cruzados contra um esquema
        de validação e informará ao usuário em caso de problemas, encerrando a 
        'request' neste ponto, não indo ao próximo nível da 'request' que é o método
        do controlador. Ele para na validação do 'DTO', porque neste caso não há informações
        necessárias para seguir. Caso o cenário seja positivo, a validação dos dados do 
        esquema esteja de acordo, irá para o próximo nível que são os métodos do controller. */
        nome: joi.string().required().messages({
          'any.required': `"nome" é um campo obrigatório`,
          'string.empty': `"nome" não deve ser vazio`,
        }),
        descricao: joi.string().required().messages({
          'any.required': `"descricao" é um campo obrigatório`,
          'string.empty': `"descricao" não deve ser vazio`,
        }),
        status: joi.boolean().required().messages({
          'any.required': `"status" é um campo obrigatório`,
          'booleam.empty': `"status" não deve ser vazio`,
        }),
      }, {
        allowUnknown: true,
      }),
      categoriaController.criarCategoria
    )

  // Pesquisar categoria por ID
  router.route('/categoria/:categoriaid').get(
    /*a validação de 'DTO' será no 'params', validação de uma
      'regular expression' que é capaz de identificar padrões em textos
      A validação é realizada em cima do valor do 'params' e cruzando ele
      com uma 'regular expression' para verificar se o 'ID' corresponde ao
      padrão de um 'ID' do 'MongoDB'*/
    autorizacaoMiddlewate('PESQUISA_CATEGORIA'),
    validaDTO('params', {
      // Regex para validar o formato do ID do 'Mongo'
      categoriaid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': `"categoria id" é um campo obrigatório`,
        'string.empty': `"categoria id" não deve ser vazio`,
      }),
    }),
    categoriaController.buscarPorId
  )

    // Deletar categoria
    .delete(autorizacaoMiddlewate('DELETA_CATEGORIA'),
      validaDTO('params', {
        categoriaid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"categoria id" é um campo obrigatório`,
          'string.empty': `"categoria id" não deve ser vazio`,
          'string.regex': `"categoria id" fora do formato experado`,
        }),
      }),
      categoriaController.deletarCategoria
    )

    // Atualizar categoria
    .put(autorizacaoMiddlewate('ALTERA_CATEGORIA'),
      fileUploadMiddleware('categorias', true),
      validaDTO('params', {
        categoriaid: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"categoria id" é um campo obrigatório`,
          'string.empty': `"categoria id" não deve ser vazio`,
          'string.regex': `"categoria id" fora do formato experado`,
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
        status: joi.boolean().required().messages({
          'any.required': `"status" é um campo obrigatório`,
          'booleam.empty': `"status" não deve ser vazio`,
        }),
      }, {
        allowUnknown: true,
      }),
      categoriaController.alterarCategoria
    )
}
