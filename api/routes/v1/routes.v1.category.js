const joi = require("joi");
const controllerCategory = require("../../controllers/controllers.category");

const validaDTO = require("../../utils/middlewares/validate-dto.middleware");
const fileUploadMiddleware = require("../../utils/middlewares/fileUploadMiddleware");
const autorizacaoMiddlewate = require("../../utils/middlewares/authorization.middleware");

module.exports = (router) => {
  router
    .route("/category")
    .get(
      autorizacaoMiddlewate('*'),
      controllerCategory.ControllerListAllCategories
    )

    .post(
      autorizacaoMiddlewate("CREATE_CATEGORY"),
      fileUploadMiddleware("category"),
      validaDTO(
        "body",
        {
          name: joi.string().required().messages({
            "any.required": `"name" é um campo obrigatório`,
            "string.empty": `"name" não deve ser vazio`,
          }),
          description: joi.string().required().messages({
            "any.required": `"description" é um campo obrigatório`,
            "string.empty": `"description" não deve ser vazio`,
          }),
        },
        {
          allowUnknown: true,
        }
      ),
      controllerCategory.ControllerCreateCategory
    );

  router
    .route("/category/:categoryid")
    .get(
      autorizacaoMiddlewate('*'),
      validaDTO("params", {
        categoryid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": `"category id" é um campo obrigatório`,
            "string.empty": `"category id" não deve ser vazio`,
          }),
      }),
      controllerCategory.ControllerListCategoryById
    )

    .put(
      autorizacaoMiddlewate("UPDATE_CATEGORY"),
      fileUploadMiddleware("category", true),
      validaDTO("params", {
        categoryid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": `"category id" é um campo obrigatório`,
            "string.empty": `"category id" não deve ser vazio`,
            "string.regex": `"category id" fora do formato esperado`,
          }),
      }),
      validaDTO(
        "body",
        {
          name: joi.string().required().messages({
            "any.required": `"name" é um campo obrigatório`,
            "string.empty": `"name" não deve ser vazio`,
          }),
          description: joi.string().required().messages({
            "any.required": `"description" é um campo obrigatório`,
            "string.empty": `"description" não deve ser vazio`,
          }),
        },
        {
          allowUnknown: true,
        }
      ),
      controllerCategory.ControllerChangeCategory
    )

    .delete(
      autorizacaoMiddlewate("REMOVE_CATEGORY"),
      validaDTO("params", {
        categoryid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": `"category id" é um campo obrigatório`,
            "string.empty": `"category id" não deve ser vazio`,
            "string.regex": `"category id" fora do formato esperado`,
          }),
      }),
      controllerCategory.ControllerRemoveCategory
    );
};
