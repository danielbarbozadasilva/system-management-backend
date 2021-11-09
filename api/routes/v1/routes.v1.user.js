const joi = require("joi");

const userController = require("../../controllers/controllers.user");
const validateDTO = require("../../utils/middlewares/validate-dto.middleware");

module.exports = (router) => {
  router.route("/auth").post(
    validateDTO("body", {
      email: joi.string().required().messages({
        "any.required": `"e-mail" é um campo obrigatório`,
        "string.empty": `"e-mail" não deve ser vazio`,
      }),
      password: joi.string().required().messages({
        "any.required": `"password" é um campo obrigatório`,
        "string.empty": `"password" não deve ser vazio`,
      }),
    }),
    userController.auth
  );
};
