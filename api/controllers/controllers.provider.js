const providerService = require('../services/services.provider');
const likeService = require('../services/services.like');

const ControllerListAllProviders = async (req, res, next) => {
  const { like, alphabetical } = req.params;

  const resultService = await providerService.ServiceListAllProvider({
    like,
    alphabetical,
  });
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerListProviderById = async (req, res, next) => {
  const { providerid } = req.params;
  const resultService = await providerService.ServiceListProviderById(
    providerid
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerListProvidersByLocation = async (req, res, next) => {
  const { uf, city } = req.params;
  const resultService = await providerService.ServiceListProvidersByLocation(uf, city);
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
  const { providerid } = req.params;
  const resultService = await providerService.ServiceUpdateProvider(
    providerid,
    body
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerRemoveProvider = async (req, res, next) => {
  const { providerid } = req.params;
  const resultService = await providerService.ServiceRemoveProvider(providerid);
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

const ControllerSearchLikeProduct = async (req, res, next) => {
  const { providerid } = req.params;

  const resultService = await likeService.ServiceSearchLikeProviderProduct(
    providerid
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerInsertLikeProduct = async (req, res, next) => {
  const { providerid, productid } = req.params;
  const resultService = await likeService.ServiceCreateLikeProviderProduct(
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

const ControllerDeleteLikeProduct = async (req, res, next) => {
  const { params } = req;
  const resultService = await likeService.ServiceRemoveLikeProviderProduct(
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
  ControllerListAllProviders,
  ControllerListProviderById,
  ControllerListProvidersByLocation,
  ControllerInsertProvider,
  ControllerUpdateProvider,
  ControllerRemoveProvider,
  ControllerListProductsByProvider,
  ControllerChangeStatusProvider,
  ControllerSearchLikeProduct,
  ControllerInsertLikeProduct,
  ControllerDeleteLikeProduct,
};
