const categoriaService = require('../services/categoria.service');

const altera = (req, res, next) => {

  return res.status(200).send();

}

const deleta = (req, res, next) => {

  return res.status(200).send();

}

const cria = async (req, res, next) => {

  const { body } = req;


  const resultadoServico = await categoriaService.criaCategoria(body);

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

  console.log(resultadoServico);

  return res.status(codigoRetorno).send(dadoRetorno);

}

const buscaPorId = (req, res, next) => {

  return res.status(200).send([]);

}

const lista = async (req, res, next) => {

  const result = await categoriaService.listaTodos();

  return res.status(200).send({ data: result });

}




module.exports = {
  buscaPorId,
  lista,
  cria,
  altera,
  deleta,
}