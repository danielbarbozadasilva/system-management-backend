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
  const resultService = await providerService.ServiceListProviderById(id);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerListProvidersByLocation = async (req, res, next) => {
  const { uf, city } = req.query;
  const result = await providerService.ServiceListProvidersByLocation(uf, city);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
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

const ControllerChangeStatusProvider = async (req, res, next) => {
  const { providerid, status } = req.params;
  const resultService = await providerService.ServiceChangeStatus(
    providerid,
    status
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
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
  ControllerChangeStatusProvider,
};
