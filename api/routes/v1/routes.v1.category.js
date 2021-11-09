const joi = require("joi");
const controllerCategory = require("../../controllers/controllers.category");

const validateDTO = require("../../utils/middlewares/validate-dto.middleware");
const fileUploadMiddleware = require("../../utils/middlewares/fileUploadMiddleware");
const autorizationMiddleware = require("../../utils/middlewares/authorization.middleware");

module.exports = (router) => {
  router
    .route("/category")
    .get(
      autorizationMiddleware('*'),
      controllerCategory.ControllerListAllCategories
    )

    .post(
      autorizationMiddleware("CREATE_CATEGORY"),
      fileUploadMiddleware("category"),
      validateDTO(
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
      autorizationMiddleware('*'),
      validateDTO("params", {
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
      autorizationMiddleware("UPDATE_CATEGORY"),
      fileUploadMiddleware("category", true),
      validateDTO("params", {
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
      validateDTO(
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
      autorizationMiddleware("REMOVE_CATEGORY"),
      validateDTO("params", {
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
