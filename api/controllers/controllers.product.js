const productService = require('../services/services.product');
const likeService = require('../services/services.like');

const listarproducts = async (req, res, next) => {
  const { query } = req;
  const result = await productService.SEARCHPorFiltros(query);
  return res.status(200).send({ data: result });
};

const listaId = async (req, res, next) => {
  const { id } = req.params;
  const result = await productService.SEARCH(id);
  return res.status(200).send({ data: result });
};

const UPDATEproduct = async (req, res, next) => {
  const { params, body } = req;
  const resultService = await productService.alteraproduct(
    params.productid,
    body
  );

  const codigoRetorno = resultService.success ? 200 : 400;
  const dadoRetorno = resultService.success
    ? { data: resultService.data }
    : { details: resultService.details };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const inserirproduct = async (req, res, next) => {
  const { body, params, user } = req;
  const resultService = await productService.create({
    ...params,
    ...body,
    providerlogadoid: req.params.provider,
  });
  return res.status(200).send({
    message: 'Operacao realizada com success.',
    data: resultService.data,
  });
};

const listaproductPorId = async (req, res, next) => {
  const { query } = req;
  const result = await productService.SEARCHPorFiltros(query);
  return res.status(200).send({ data: result });
};

const removeproduct = async (req, res, next) => {
  const { providerid, productid } = req.params;
  const { user } = req;
  const resultService = await productService.deleta({
    providerId: providerid,
    productId: productid,
    userId: req.user.id,
  });
  const codigoRetorno = resultService.success ? 200 : 400;
  const dadoRetorno = resultService.success
    ? { message: resultService.message, data: resultService.data }
    : { details: resultService.details };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const curtirproduct = async (req, res, next) => {
  const { params, user } = req;
  const { providerid, productid } = req.params;
  const result = await likeService.createlikeproviderproduct(
    providerid,
    productid
  );
  const codigoRetorno = result.success ? 200 : 400;
  const dadoRetorno = result.success
    ? { data: result.data }
    : { details: result.details };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const removerproductlikes = async (req, res, next) => {
  const { user, params } = req;
  const result = await likeService.removeLikeProviderproduct(
    params.providerid,
    params.productid
  );
  const codigoRetorno = result.success ? 200 : 400;
  const dadoRetorno = result.success
    ? { data: result.data }
    : { details: result.details };
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
