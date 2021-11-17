const productService = require('../services/services.product');
const likeService = require('../services/services.like');

const ControllerListAllProducts = async (req, res, next) => {
  const { query } = req;
  const resultService = await productService.ServiceSearchByFilter(query);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerListProductById = async (req, res, next) => {
  const { id } = req.params;
  const resultService = await productService.ServiceListProductById(id);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerUpdateProduct = async (req, res, next) => {
  const { params, body } = req;
  const resultService = await productService.ServiceUpdateProduct(
    params.productid,
    body
  );

  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerInsertProduct = async (req, res, next) => {
  const { body, params, user } = req;
  const resultService = await productService.ServiceInsertProduct({
    ...params,
    ...body,
    providerlogadoid: req.params.provider,
  });
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerRemoveProduct = async (req, res, next) => {
  const { providerid, productid } = req.params;
  const { user } = req;
  const resultService = await productService.ServiceRemoveProduct({
    providerId: providerid,
    productId: productid,
    userId: req.user.id,
  });
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerCreateLikeProduct = async (req, res, next) => {
  const { params, user } = req;
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

const ControllerRemoveLikeProduct = async (req, res, next) => {
  const { user, params } = req;
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
  ControllerListAllProducts,
  ControllerListProductById,
  ControllerUpdateProduct,
  ControllerInsertProduct,
  ControllerRemoveProduct,
  ControllerCreateLikeProduct,
  ControllerRemoveLikeProduct,
};
