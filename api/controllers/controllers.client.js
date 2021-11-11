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
  const { params } = req;
  const resultService = await serviceClientService.ServiceSearchById(
    params.clientid
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerListLikesClient = async (req, res, next) => {
  const { clientid } = req.params;
  const resultService = await serviceClientService(clientid);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerCreateClient = async (req, res, next) => {
  const { body } = req;
  const resultService = await serviceClientService.ServiceCreate(body);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerLikeProvider = async (req, res, next) => {
  const { params, user } = req;
  const { providerid } = req.params;
  const resultService =
    await serviceLikeService.ServiceCreateLikeClientProvider(
      providerid,
      user.id
    );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerRemoveLikeProvider = async (req, res, next) => {
  const { params } = req;
  const resultService =
    await serviceLikeService.ServiceRemoveLikeClientProvider(
      params.providerid,
      params.clientid
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
  ControllerListLikesClient,
  ControllerCreateClient,
  ControllerLikeProvider,
  ControllerRemoveLikeProvider,
};
