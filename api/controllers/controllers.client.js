const serviceClientService = require('../services/services.client');
const serviceLikeService = require('../services/services.like');

const ControllerListAllClients = async (req, res, next) => {
  const result = await serviceClientService.listaTodos();
  return res.status(200).send(result);
};

const ControllerListClientById = async (req, res, next) => {
  const { params } = req;
  const result = await serviceClientService.SEARCHPorId(params.clientid);
  return res.status(200).send(result);
};

const ControllerListLikesClient = async (req, res, next) => {
  const { clientid } = req.params;
  const result = await serviceClientService.listalike(clientid);
  return res.status(200).send(result);
};

const ControllerCreateClient = async (req, res, next) => {
  const { body } = req;
  const result = await serviceClientService.create(body);
  const codigoRetorno = result.success ? 200 : 400;
  const dadoRetorno = result.success
    ? { data: result.data }
    : { details: result.details };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const ControllerLikeProvider = async (req, res, next) => {
  const { params, user } = req;
  const { providerid } = req.params;
  const result = await serviceLikeService.ServiceCreateLikeClientProvider(
    providerid,
    user.id
  );
  const codigoRetorno = result.success ? 200 : 400;
  const dadoRetorno = result.success
    ? { data: result.data }
    : { details: result.details };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const ControllerRemoveLikeProvider = async (req, res, next) => {
  const { params } = req;
  const result = await serviceLikeService.removelikeclientprovider(
    params.providerid,
    params.clientid
  );
  const codigoRetorno = result.success ? 200 : 400;
  const dadoRetorno = result.success
    ? { data: result.data }
    : { details: result.details };
  return res.status(codigoRetorno).send(dadoRetorno);
};

module.exports = {
  ControllerListAllClients,
  ControllerListClientById,
  ControllerListLikesClient,
  ControllerCreateClient,
  ControllerLikeProvider,
  ControllerRemoveLikeProvider,
};
