const providerService = require('../services/services.provider');

const ControllerListAllProviders = async (req, res, next) => {
  const resultService = await providerService.ServiceListAllProvider();
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerListProviderById = async (req, res, next) => {
  const { id } = req.params;
  const result = await providerService.ServiceListProviderById(id);
  const codigoRetorno = result.success ? 200 : 400;
  const dadoRetorno = result.success
    ? { data: result.data }
    : { details: result.details };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const ControllerListProvidersByLocation = async (req, res, next) => {
  const { uf, city } = req.query;
  const result = await providerService.ServiceListProvidersByLocation(uf, city);
  const codigoRetorno = result.success ? 200 : 400;
  const dadoRetorno = result.success
    ? { data: result.data }
    : { details: result.details };
  return res.status(codigoRetorno).send(dadoRetorno);
};

const ControllerInsertProvider = async (req, res, next) => {
  const { body } = req;
  const resultService = await providerService.ServiceCreateProvider(body);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerUpdateProvider = async (req, res, next) => {
  const { body } = req;
  const id = req.params.id;
  const resultService = await providerService.ServiceUpdateProvider(id, body);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerListProductsByProvider = async (req, res, next) => {
  const { providerid } = req.params;
  const resultService = await providerService.ServiceListProductsProvider(
    providerid
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerSearchLikesReceived = async (req, res, next) => {
  const { id } = req.params;
  const resultService = await providerService.ServiceListLikesClient(id);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerSearchProductsProvider = async (req, res, next) => {
  const id = req.params.id;
  const resultService = await providerService.ServiceListProductsProvider(id);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerEnableProvider = async (req, res, next) => {
  const { id } = req.params;
  const resultService = await providerService.ServiceEnableProvider(id);
  const codigoRetorno = resultService.success ? 200 : 400;
  const dadoRetorno = resultService.success
    ? { data: resultService.data }
    : { details: resultService.details };
  return res.status(codigoRetorno).send({
    message: 'Operation performed successfully',
    ...dadoRetorno,
  });
};

const ControllerDisableProvider = async (req, res, next) => {
  const { id } = req.params;
  const resultService = await providerService.ServiceDisableProvider(id);
  const codigoRetorno = resultService.success ? 200 : 400;
  const dadoRetorno = resultService.success
    ? { data: resultService.data }
    : { details: resultService.details };
  return res.status(codigoRetorno).send({
    message: 'Operation performed successfully',
    ...dadoRetorno,
  });
};

module.exports = {
  ControllerListAllProviders,
  ControllerListProviderById,
  ControllerListProvidersByLocation,
  ControllerInsertProvider,
  ControllerUpdateProvider,
  ControllerListProductsByProvider,
  ControllerSearchLikesReceived,
  ControllerSearchProductsProvider,
  ControllerEnableProvider,
  ControllerDisableProvider,
};
