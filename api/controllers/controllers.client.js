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
  const resultService = await serviceClientService.ServiceSearchById({
    clientid,
  });
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

const ControllerSearchLikeProduct = async (req, res, next) => {
  const { providerid, productid } = req.params;
  const resultService =
    await serviceLikeService.ServiceSearchLikeProviderProduct(
      providerid,
      productid
    );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerInsertLikeProduct = async (req, res, next) => {
  const { params, user } = req;
  const { providerid, productid } = req.params;
  const resultService =
    await serviceLikeService.ServiceCreateLikeProviderProduct(
      providerid,
      productid
    );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerRemoveLikeProvider = async (req, res, next) => {
  const { user, params } = req;
  const resultService =
    await serviceLikeService.ServiceRemoveLikeProviderProduct(
      params.providerid,
      params.productid
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
  ControllerSearchLikeProduct,
  ControllerInsertLikeProduct,
  ControllerRemoveLikeProvider,
};
