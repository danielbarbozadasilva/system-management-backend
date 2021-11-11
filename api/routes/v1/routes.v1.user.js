const joi = require('joi');

const userController = require('../../controllers/controllers.user');
const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto');

module.exports = (router) => {
  router.route('/auth').post(
    middlewareValidateDTO('body', {
      email: joi.string().required().messages({
        'any.required': `"e-mail" is a required field`,
        'string.empty': `"e-mail" can not be empty`,
      }),
      password: joi.string().required().messages({
        'any.required': `"password" is a required field`,
        'string.empty': `"password" can not be empty`,
      }),
    }),
    userController.ControllerAuth
  );
};
