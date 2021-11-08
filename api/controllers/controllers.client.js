const clientService = require('../services/services.client');
const likeService = require('../services/services.like');

const listarTodosclients = async (req, res, next) => {
  const result = await clientService.listaTodos();

  return res.status(200).send(result);
};

const pesquisaPorId = async (req, res, next) => {
  const { params } = req;
  const result = await clientService.pesquisaPorId(params.clientid);

  return res.status(200).send(result);
};

const listarlikesprovider = async (req, res, next) => {
  const { clientid } = req.params;
  const result = await clientService.listalike(clientid);

  return res.status(200).send(result);
};

const cria = async (req, res, next) => {
  const { body } = req;
  const result = await clientService.cria(body);
  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
};

const curteprovider = async (req, res, next) => {
  const { params, usuario } = req;
  const { providerid } = req.params;
  const result = await likeService.crialikeclientprovider(
    providerid,
    usuario.id
  );
  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
};

const removelikeprovider = async (req, res, next) => {
  const { params } = req;
  const result = await likeService.removelikeclientprovider(
    params.providerid,
    params.clientid
  );
  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };
  return res.status(codigoRetorno).send(dadoRetorno);
};

module.exports = {
  cria,
  pesquisaPorId,
  listarTodosclients,
  curteprovider,
  removelikeprovider,
  listarlikesprovider,
};
