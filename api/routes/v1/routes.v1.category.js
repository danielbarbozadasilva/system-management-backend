const joi = require('joi');
const controllerCategory = require('../../controllers/controllers.category');

const middlewareValidateDTO = require('../../utils/middlewares/middlewares.validate_dto');
const middlewareFileUploadMiddleware = require('../../utils/middlewares/middlewares.file_upload');
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization');

module.exports = (router) => {
  router
    .route('/category')
    .get(
      authorizationMiddleware('*'),
      controllerCategory.ControllerListAllCategory
    )

    .post(
      authorizationMiddleware('CREATE_CATEGORY'),
      middlewareFileUploadMiddleware('category'),
      middlewareValidateDTO(
        'body',
        {
          name: joi.string().required().messages({
            'any.required': `"name" is a required field`,
            'string.empty': `"name" can not be empty`,
          }),
          description: joi.string().required().messages({
            'any.required': `"description" is a required field`,
            'string.empty': `"description" can not be empty`,
          }),
        },
        {
          allowUnknown: true,
        }
      ),
      controllerCategory.ControllerCreateCategory
    );

  router
    .route('/category/:categoryid')
    .get(
      authorizationMiddleware('*'),
      middlewareValidateDTO('params', {
        categoryid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"category id" is a required field`,
            'string.empty': `"category id" can not be empty`,
          }),
      }),controllerCategory.ControllerListCategoryById)

    .put(
      authorizationMiddleware('UPDATE_CATEGORY'),
      middlewareFileUploadMiddleware('category', true),
      middlewareValidateDTO('params', {
        categoryid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"category id" is a required field`,
            'string.empty': `"category id" can not be empty`,
            'string.regex': `"category id" out of the expected format`,
          }),
      }),
      middlewareValidateDTO(
        'body',
        {
          name: joi.string().required().messages({
            'any.required': `"name" is a required field`,
            'string.empty': `"name" can not be empty`,
          }),
          description: joi.string().required().messages({
            'any.required': `"description" is a required field`,
            'string.empty': `"description" can not be empty`,
          }),
        },
        {
          allowUnknown: true,
        }
      ),
      controllerCategory.ControllerUpdateCategory
    )

    .delete(
      authorizationMiddleware('REMOVE_CATEGORY'),
      middlewareValidateDTO('params', {
        categoryid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"category id" is a required field`,
            'string.empty': `"category id" can not be empty`,
            'string.regex': `"category id" out of the expected format`,
          }),
      }),
      controllerCategory.ControllerRemoveCategory
    );
};
