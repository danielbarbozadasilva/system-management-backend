const clientService = require('../services/services.client');
const likeService = require('../services/services.like');

const ControllerListAllClients = async (req, res, next) => {
  const resultService = await clientService.listAllClientService();
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerListClientById = async (req, res, next) => {
  const { clientid } = req.params;
  const resultService = await clientService.listClientByIdService(
    clientid
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerInsertClients = async (req, res, next) => {
  const { body } = req;
  const resultService = await clientService.createClientService(body);
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

  const resultService = await clientService.updateClientService(
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
  const resultService = await clientService.deleteClientService(
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
    await likeService.listLikesClientProviderService(clientid);
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
    await likeService.createLikeClientProviderService(
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
    await likeService.removeLikeClientProviderService(
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
