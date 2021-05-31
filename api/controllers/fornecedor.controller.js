const fornecedorService = require('../services/fornecedor.service');


const cria = async (req, res, next) => {

  const { body } = req;

  const result = await fornecedorService.cria(body);

  //TODO: tratar saida e finalizar enpoint
  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso ? { data: result.data } : { detalhes: result.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);

}


const ativa = async (req, res, next) => {

  const { fornecedorid } = req.params;

  // invocar método do servico
  const resultadoServico = await fornecedorService.alteraStatus(fornecedorid, 'Ativo');


  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

  // tratar saída
  return res.status(codigoRetorno).send({
    mensagem: 'operaçao realizada com sucesso',
    ...dadoRetorno
  });

}

const inativa = async (req, res, next) => {

  const { fornecedorid } = req.params;

  // invocar método do servico
  const resultadoServico = await fornecedorService.alteraStatus(fornecedorid, 'Inativo');

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

  // tratar saída
  return res.status(codigoRetorno).send({
    mensagem: 'operaçao realizada com sucesso',
    ...dadoRetorno
  });

}

const lista = async (req, res, next) => {

  const data = await fornecedorService.listaTodos();

  return res.status(200).send({
    data
  })
}

module.exports = {
  ativa,
  cria,
  inativa,
  lista
}