const fornecedorService = require('../services/fornecedor.service');

const ativa = async (req, res, next) => {

  const { fornecedorid } = req.params;

  const resultadoServico = await fornecedorService.alteraStatus(fornecedorid, 'Ativo');

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send({
    ...dadoRetorno
  });

}

const inativa = async (req, res, next) => {

  const { fornecedorid } = req.params;

  const resultadoServico = await fornecedorService.alteraStatus(fornecedorid, 'Inativo');

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send({
    mensagem: 'operaçao realizada com sucesso',
    ...dadoRetorno
  });
}

const cria = async (req, res, next) => {

  const { body } = req;

  const result = await fornecedorService.cria(body);

  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso ? { data: result.data } : { detalhes: result.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);

}

const lista = async (req, res, next) => {

  const data = await fornecedorService.listaTodos();

  return res.status(200).send({
    data,
  })

}

const buscaProdutosPorFornecedor = async (req, res, next) => {

  const { params } = req;

  const data = await fornecedorService.listaProdutosByFornecedor(params.fornecedorid);

  return res.status(200).send({
    data,
  })

}

module.exports = {
  ativa,
  buscaProdutosPorFornecedor,
  cria,
  inativa,
  lista,
}
