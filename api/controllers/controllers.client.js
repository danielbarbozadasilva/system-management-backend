const serviceClientService = require('../services/services.client');
const serviceLikeService = require('../services/services.like');

const ControllerListAllClients = async (req, res, next) => {
  const resultService = await serviceClientService.ServiceListAll();
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerListClientById = async (req, res, next) => {
  const { clientid } = req.params;
  const resultService = await serviceClientService.ServiceSearchById(clientid);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerInsertClients = async (req, res, next) => {
  const resultService = await serviceClientService.ServiceListAll();
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerUpdateClients = async (req, res, next) => {
  const { clientid } = req.params;
  const { body } = req;

  const resultService = await serviceClientService.ServiceUpdateClient(
    clientid,
    body
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerDeleteClients = async (req, res, next) => {
  const { clientid } = req.params;
  const resultService = await serviceClientService.ServiceDeleteClient(
    clientid
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerSearchLikeProvider = async (req, res, next) => {
  const { clientid } = req.params;
  const resultService =
    await serviceLikeService.ServiceSearchLikeClientProvider(clientid);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerInsertLikeProvider = async (req, res, next) => {
  const { providerid, clientid } = req.params;
  const resultService =
    await serviceLikeService.ServiceCreateLikeClientProvider(
      providerid,
      clientid
    );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerRemoveLikeProvider = async (req, res, next) => {
  const { providerid, clientid } = req.params;
  const resultService =
    await serviceLikeService.ServiceRemoveLikeClientProvider(
      providerid,
      clientid
    );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

module.exports = {
  ControllerListAllClients,
  ControllerListClientById,
  ControllerInsertClients,
  ControllerUpdateClients,
  ControllerDeleteClients,
  ControllerSearchLikeProvider,
  ControllerInsertLikeProvider,
  ControllerRemoveLikeProvider,
};
