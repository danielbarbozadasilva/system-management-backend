const productService = require('../services/services.product');
const likeService = require('../services/services.like');

const listarproducts = async (req, res, next) => {
  const { query } = req;
  const result = await productService.pesquisaPorFiltros(query);
  return res.status(200).send({ data: result });
};

const listaId = async (req, res, next) => {
  const { id } = req.params;
  const result = await productService.pesquisa(id);
  return res.status(200).send({ data: result });
};

const UPDATEproduct = async (req, res, next) => {
  const { params, body } = req;
  const resultadoServico = await productService.alteraproduct(
    params.productid,
    body
  );

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso
    ? { data: resultadoServico.data }
    : { detalhes: resultadoServico.detalhes };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const inserirproduct = async (req, res, next) => {
  const { body, params, user } = req;
  const resultadoServico = await productService.cria({
    ...params,
    ...body,
    providerlogadoid: req.params.provider,
  });
  return res.status(200).send({
    mensagem: 'Operacao realizada com sucesso.',
    data: resultadoServico.data,
  });
};

const listaproductPorId = async (req, res, next) => {
  const { query } = req;
  const result = await productService.pesquisaPorFiltros(query);
  return res.status(200).send({ data: result });
};

const removeproduct = async (req, res, next) => {
  const { providerid, productid } = req.params;
  const { user } = req;
  const resultadoServico = await productService.deleta({
    providerId: providerid,
    productId: productid,
    userId: req.user.id,
  });
  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso
    ? { mensagem: resultadoServico.mensagem, data: resultadoServico.data }
    : { detalhes: resultadoServico.detalhes };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const curtirproduct = async (req, res, next) => {
  const { params, user } = req;
  const { providerid, productid } = req.params;
  const result = await likeService.crialikeproviderproduct(
    providerid,
    productid
  );
  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const removerproductlikes = async (req, res, next) => {
  const { user, params } = req;
  const result = await likeService.removelikeproviderproduct(
    params.providerid,
    params.productid
  );
  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };
  return res.status(codigoRetorno).send(dadoRetorno);
};

module.exports = {
  inserirproduct,
  removeproduct,
  listarproducts,
  listaproductPorId,
  UPDATEproduct,
  listaId,
  curtirproduct,
  removerproductlikes,
};
