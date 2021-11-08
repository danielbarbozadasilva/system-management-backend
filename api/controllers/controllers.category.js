const categoryService = require('../services/services.category');

const ControllerListAllCategories = async (req, res, next) => {
  const resultService = await categoryService.ServiceSearchAllCategory();
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerListCategoryById = async (req, res, next) => {
  const { params } = req;
  const resultService = await categoryService.ServiceSearchCategoryById(
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
  const resultService = await categoryService.ServiceInsertCategory(body);
  const code = resultService.success ? 200 : 400;
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details };
  const data = resultService.data ? resultService.data : '';
  return res.status(code).send({ message: message, data });
};

const ControllerChangeCategory = async (req, res, next) => {
  const { params, body } = req;

  const resultadoServico = await categoryService.ServiceChangeCategory(
    params.categoryid,
    body
  );

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso
    ? { data: resultadoServico.data }
    : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
};

const ControllerRemoveCategory = async (req, res, next) => {
  const { params } = req;

  const resultadoServico = await categoryService.ServiceRemoveCategoryProducts(
    params.categoryid
  );
  const code = resultadoServico.success ? 200 : 400;

  const message = resultadoServico.success
    ? {
        message: resultadoServico.message,
      }
    : { details: resultadoServico.details };

  return res.status(code).send(message);
};

module.exports = {
  ControllerListAllCategories,
  ControllerListCategoryById,
  ControllerCreateCategory,
  ControllerChangeCategory,
  ControllerRemoveCategory,
};
