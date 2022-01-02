const categoryService = require('../services/services.category');

const ControllerListAllCategory = async (req, res, next) => {
  const resultService = await categoryService.searchAllCategoryService();
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerListCategoryById = async (req, res, next) => {
  const { params } = req;
  const resultService = await categoryService.searchCategoryByIdService(
    params.categoryid
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerCreateCategory = async (req, res, next) => {
  const { body } = req;
  const resultService = await categoryService.addCategoryService(body);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerUpdateCategory = async (req, res, next) => {
  const { params, body } = req;
  const resultService = await categoryService.updateCategoryService(
    params.categoryid,
    body
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerRemoveCategory = async (req, res, next) => {
  const { params } = req;
  const resultService = await categoryService.removeCategoryProductsService(
    params.categoryid
  );
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

module.exports = {
  ControllerListAllCategory,
  ControllerListCategoryById,
  ControllerCreateCategory,
  ControllerUpdateCategory,
  ControllerRemoveCategory,
};
