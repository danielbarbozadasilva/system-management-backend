const providerService = require('../services/provider.service');
const productMapper = require('../mappers/mappers.product');
const { provider } = require('../models/models.index');

const activeProvider = async (req, res, next) => {
  const { id } = req.params;
  const resultadoServico = await providerService.alteraStatus(id, 'Enabled');
  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso
    ? { data: resultadoServico.data }
    : { detalhes: resultadoServico.detalhes };
  return res.status(codigoRetorno).send({
    ...dadoRetorno,
  });
};

const disableProvider = async (req, res, next) => {
  const { id } = req.params;
  const resultadoServico = await providerService.alteraStatus(id, 'Disabled');
  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso
    ? { data: resultadoServico.data }
    : { detalhes: resultadoServico.detalhes };
  return res.status(codigoRetorno).send({
    mensagem: 'operaçao realizada com sucesso',
    ...dadoRetorno,
  });
};

const insertProvider = async (req, res, next) => {
  const { body } = req;
  const result = await providerService.createProvider(body);
  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const updateProvider = async (req, res, next) => {
  const { body } = req;
  const id = req.params.id;
  const result = await providerService.updateProvider(id, body);
  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };
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
  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };
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
