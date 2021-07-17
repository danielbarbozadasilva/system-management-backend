const produtoService = require("../services/produto.service");
const { produto, categoria, fornecedor } = require("../models/index");

const inserirProduto = async (req, res, next) => {

  const { body, params, usuario } = req;

  const resultadoServico = await produtoService.cria({
    ...params,
    ...body,
    fornecedorlogadoid: usuario.id
  });

  return res.status(200).send({
    mensage: "Operacao realizada com sucesso.",
    data: resultadoServico.data
  });

}


const listaProdutoPorId = async (req, res, next) => {
  const { query } = req;
  const result = await produtoService.pesquisaPorFiltros(query);

  return res.status(200).send({ data: result });
};

const listarProdutos = async (req, res, next) => {
  const { query } = req;
  const result = await produtoService.pesquisaPorFiltros(query);

  return res.status(200).send({ data: result });
};

const removeProduto = async (req, res, next) => {

  const { fornecedorid, produtoid } = req.params;
  const { usuario } = req;


  const resultadoServico = await produtoService.deleta({ fornecedorId: fornecedorid, produtoId: produtoid, usuarioId: req.usuario.id });

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso ? { mensagem: resultadoServico.mensagem, data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);

}


module.exports = {
  inserirProduto,
  removeProduto,
  listarProdutos,
  listaProdutoPorId
};
