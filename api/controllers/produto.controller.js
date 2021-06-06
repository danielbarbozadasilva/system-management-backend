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



module.exports = {
  cria,
}
