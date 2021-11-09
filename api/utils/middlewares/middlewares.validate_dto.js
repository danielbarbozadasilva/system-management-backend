const Joi = require("joi");

const validateDTO = (type, parametro, opcoes = {}) => {
  return (req, res, next) => {
    const schema = Joi.object().keys(parametro);
    const result = schema.validate(req[type], {
      allowUnknown: false,
      ...opcoes,
    });

    if (result.error) {
      const mensagens = result.error.details.reduce((acc, item) => {
        return [...acc, item.message];
      }, []);

      return res.status(400).send({
        success: false,
        details: [...mensagens],
      });
    }

    return next();
  };
};
module.exports = validateDTO;
