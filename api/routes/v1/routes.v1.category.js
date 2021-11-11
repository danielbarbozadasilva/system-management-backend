const joi = require("joi");
const controllerCategory = require("../../controllers/controllers.category");

const validateDTO = require("../../utils/middlewares/middlewares.validate_dto");
const fileUploadMiddleware = require("../../utils/middlewares/middlewares.file_upload");
const autorizationMiddleware = require("../../utils/middlewares/middlewares.authorization");

module.exports = (router) => {
  router
    .route("/category")
    .get(
      autorizationMiddleware('*'),
      controllerCategory.ControllerListAllCategory
    )

    .post(
      autorizationMiddleware("CREATE_CATEGORY"),
      fileUploadMiddleware("category"),
      validateDTO(
        "body",
        {
          name: joi.string().required().messages({
            "any.required": `"name" is a required field`,
            "string.empty": `"name" can not be empty`,
          }),
          description: joi.string().required().messages({
            "any.required": `"description" is a required field`,
            "string.empty": `"description" can not be empty`,
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
            "any.required": `"category id" is a required field`,
            "string.empty": `"category id" can not be empty`,
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
            "any.required": `"category id" is a required field`,
            "string.empty": `"category id" can not be empty`,
            "string.regex": `"category id" out of the expected format`,
          }),
      }),
      validateDTO(
        "body",
        {
          name: joi.string().required().messages({
            "any.required": `"name" is a required field`,
            "string.empty": `"name" can not be empty`,
          }),
          description: joi.string().required().messages({
            "any.required": `"description" is a required field`,
            "string.empty": `"description" can not be empty`,
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
            "any.required": `"category id" is a required field`,
            "string.empty": `"category id" can not be empty`,
            "string.regex": `"category id" out of the expected format`,
          }),
      }),
      controllerCategory.ControllerRemoveCategory
    );
};
