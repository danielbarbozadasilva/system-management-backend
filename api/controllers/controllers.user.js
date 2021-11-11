const userService = require("../services/services.user");

const ControllerAuth = async (req, res, next) => {
  const { email, password } = req.body;
  const resultService = await userService.ServiceAuthenticate(email, password);
   const code = resultService.success ? 200 : 401;
   const message = resultService.success
     ? { message: resultService.message }
     : { details: resultService.details };
   const data = resultService.data ? resultService.data : '';
   return res.status(code).send({ message: message, data });
};

module.exports = { ControllerAuth };
