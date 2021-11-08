const providerervices = require('../services/provider.service');
const likeService = require('../services/services.like');
const productMapper = require('../mappers/mappers.product');
const { product, category, provider } = require('../models/models.index');

const activeProvider = async (req, res, next) => {
  const { providerid } = req.params;

  const resultadoServico = await providerervices.alteraStatus(
    providerid,
    'Ativo'
  );
  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso
    ? { data: resultadoServico.data }
    : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send({
    ...dadoRetorno,
  });
};

const disableProvider = async (req, res, next) => {
  const { providerid } = req.params;

  const resultadoServico = await providerervices.alteraStatus(
    providerid,
    'Inativo'
  );

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
  const result = await providerervices.createProvider(body);

  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
};

const updateProvider = async (req, res, next) => {
  const { body } = req;
  const providerid = req.params.id;
  const result = await providerervices.updateProvider(providerid, body);

  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
};

const listAllprovider = async (req, res, next) => {
  const resultadoDB = await providerervices.listAll();
  return res.status(200).send(resultadoDB);
};

const listAllproviderLocation = async (req, res, next) => {
  const { uf, cidade } = req.query;
  let filtro = {};
  if (cidade == undefined || cidade == 'x') {
    filtro = { uf };
  } else {
    filtro = { uf, cidade };
  }
  const resultadoDB = await provider.find(filtro);
  return res.send(resultadoDB);
};

const listById = async (req, res, next) => {
  const { providerid } = req.params;

  const result = await providerervices.listProviderById(providerid);

  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
};

const listaproductsByprovider = async (providerid, providerlogadoid) => {
  const providerFromDB = await provider
    .findById(providerid)
    .populate('products');
  const providerAsJSON = providerFromDB.toJSON();
  return providerAsJSON.products.map((item) => {
    return productMapper.toItemListaDTO(item);
  });
};

const searchLikesReceived = async (req, res, next) => {
  const { providerid } = req.params;

  const result = await providerervices.providerlikeproduct(providerid);
  return res.status(200).send(result);
};

const searchProductsProvider = async (req, res, next) => {
  const id = req.params.providerid;
  const data = await providerervices.listProductsProvider(id);

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
