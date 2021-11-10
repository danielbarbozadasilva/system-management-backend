const providerService = require('../services/services.provider');
const productMapper = require('../mappers/mappers.product');
const { provider } = require('../models/models.index');

const activeProvider = async (req, res, next) => {
  const { id } = req.params;
  const resultService = await providerService.alteraStatus(id, 'Enabled');
  const codigoRetorno = resultService.success ? 200 : 400;
  const dadoRetorno = resultService.success
    ? { data: resultService.data }
    : { details: resultService.details };
  return res.status(codigoRetorno).send({
    ...dadoRetorno,
  });
};

const disableProvider = async (req, res, next) => {
  const { id } = req.params;
  const resultService = await providerService.alteraStatus(id, 'Disabled');
  const codigoRetorno = resultService.success ? 200 : 400;
  const dadoRetorno = resultService.success
    ? { data: resultService.data }
    : { details: resultService.details };
  return res.status(codigoRetorno).send({
    message: 'operaçao realizada com success',
    ...dadoRetorno,
  });
};

const insertProvider = async (req, res, next) => {
  const { body } = req;
  const result = await providerService.createProvider(body);
  const codigoRetorno = result.success ? 200 : 400;
  const dadoRetorno = result.success
    ? { data: result.data }
    : { details: result.details };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const updateProvider = async (req, res, next) => {
  const { body } = req;
  const id = req.params.id;
  const result = await providerService.updateProvider(id, body);
  const codigoRetorno = result.success ? 200 : 400;
  const dadoRetorno = result.success
    ? { data: result.data }
    : { details: result.details };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const listAllprovider = async (req, res, next) => {
  const resultadoDB = await providerService.listAll();
  return res.status(200).send(resultadoDB);
};

const listAllproviderLocation = async (req, res, next) => {
  const { uf, city } = req.query;
  let filter = {};
  if (city == undefined || city == 'x') {
    filter = { uf };
  } else {
    filter = { uf, city };
  }
  const resultadoDB = await provider.find(filter);
  return res.send(resultadoDB);
};

const listById = async (req, res, next) => {
  const { id } = req.params;
  const result = await providerService.listProviderById(id);
  const codigoRetorno = result.success ? 200 : 400;
  const dadoRetorno = result.success
    ? { data: result.data }
    : { details: result.details };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const listaproductsByprovider = async (id, providerlogadoid) => {
  const providerFromDB = await provider.findById(id).populate('products');
  const providerAsJSON = providerFromDB.toJSON();
  return providerAsJSON.products.map((item) => {
    return productMapper.toItemListaDTO(item);
  });
};

const searchLikesReceived = async (req, res, next) => {
  const { id } = req.params;
  const result = await providerService.providerlikeproduct(id);
  return res.status(200).send(result);
};

const searchProductsProvider = async (req, res, next) => {
  const id = req.params.id;
  const data = await providerService.listProductsProvider(id);
  return res.status(200).send({ data });
};

module.exports = {
  activeProvider,
  disableProvider,
  insertProvider,
  updateProvider,
  listAllprovider,
  listById,
  searchLikesReceived,
  searchProductsProvider,
  listaproductsByprovider,
  listAllproviderLocation,
};
