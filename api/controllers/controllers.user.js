const userService = require("../services/services.user");

const ControllerAuth = async (req, res, next) => {
  const { email, password } = req.body;
  const resultService = await userService.ServiceAuthenticate(email, password);
  const codigoRetorno = resultService.success ? 200 : 401;
  const dadoRetorno = resultService.success
    ? { data: resultService.data }
    : { details: resultService.details };
  return res.status(codigoRetorno).send({
    message: resultService.message,
    ...dadoRetorno,
  });
};

module.exports = { ControllerAuth };
