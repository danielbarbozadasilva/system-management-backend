const produtoService = require('../services/produto.service');

const cria = async (req, res, next) => {

  const { body, params } = req;

  const resultadoServico = await produtoService.cria({
    ...params,
    ...body
  });

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);

}

const lista = async (req, res, next) => {

  const { query } = req;

  console.log(query);

  const result = await produtoService.pesquisaPorFiltros(query);

  return res.status(200).send({ data: result });

}

module.exports = {
  cria,
  lista,
}
