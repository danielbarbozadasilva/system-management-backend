const clienteService = require('../services/cliente.service');

const ativa = async (req, res, next) => {

  const { clienteid } = req.params;

  const resultadoServico = await clienteService.alteraStatus(clienteid, 'Ativo');

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send({
    ...dadoRetorno
  });

}

const inativa = async (req, res, next) => {

  const { clienteid } = req.params;

  const resultadoServico = await clienteService.alteraStatus(clienteid, 'Inativo');

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send({
    mensagem: 'operaçao realizada com sucesso',
    ...dadoRetorno
  });
}

const cria = async (req, res, next) => {

  const { body } = req;

  const result = await clienteService.cria(body);

  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso ? { data: result.data } : { detalhes: result.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);

}

const lista = async (req, res, next) => {

  const data = await clienteService.listaTodos();

  return res.status(200).send({
    data
  })

}

const buscaProdutosPorcliente = async (req, res, next) => {

  const { params } = req;

  const data = await clienteService.listaProdutosBycliente(params.clienteid);

  return res.status(200).send({
    data,
  })

}

module.exports = {
  ativa,
  buscaProdutosPorcliente,
  cria,
  inativa,
  lista,
}
