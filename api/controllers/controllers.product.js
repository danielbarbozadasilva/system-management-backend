const productService = require('../services/services.product');

const ControllerFilterProduct = async (req, res, next) => {
  const { query } = req;
  const resultService = await productService.ServiceSearchProductByFilter(
    query
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerListProductById = async (req, res, next) => {
  const { productid } = req.params;
  const resultService = await productService.ServiceListProductById(productid);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerListProductByProvider = async (req, res, next) => {
  const { providerid } = req.params;
  const resultService = await productService.ServiceListProductsProvider(
    providerid
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerInsertProduct = async (req, res, next) => {
  const { body } = req;
  const { providerid } = req.params;
  const resultService = await productService.ServiceCreateProduct(
    body,
    providerid
  );
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

module.exports = {
  ControllerFilterProduct,
  ControllerListProductById,
  ControllerListProductByProvider,
  ControllerUpdateProduct,
  ControllerInsertProduct,
  ControllerRemoveProduct,
};
