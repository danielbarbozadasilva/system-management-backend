const categoriaService = require("../services/categoria.service");

const listaTodasAsCategorias = async (req, res, next) => {
  const result = await categoriaService.listaTodos();
  return res.status(200).send({ data: result });
};

const buscarPorId = async (req, res, next) => {
  const { params } = req;

  const categoria = await categoriaService.buscaPorId(params.categoriaid);

  if (!categoria)
    return res.status(404).send({
      detalhes: ["categoria informada nao existe"],
    });

  return res.status(200).send(categoria);
};

const createCategory = async (req, res, next) => {
  const { body } = req;

  const resultadoServico = await categoriaService.insertCategory(body);

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso
    ? { data: resultadoServico.data }
    : { detalhes: resultadoServico.detalhes };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const alterarCategoria = async (req, res, next) => {
  const { params, body } = req;

  const resultadoServico = await categoriaService.alteraCategoria(
    params.categoriaid,
    body
  );

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso
    ? { data: resultadoServico.data }
    : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
};

const deletarCategoria = async (req, res, next) => {
  const { params } = req;

  const resultadoServico = await categoriaService.deleta(params.categoriaid);
  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;

  const dadoRetorno = resultadoServico.sucesso
    ? {
        mensagem: resultadoServico.mensagem,
      }
    : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
};

module.exports = {
  listaTodasAsCategorias,
  buscarPorId,
  createCategory,
  deletarCategoria,
  alterarCategoria,
};
