const userService = require("../services/services.user");

const auth = async (req, res, next) => {
  const { email, senha } = req.body;
  const resultadoServico = await userService.autenticar(email, senha);
  const codigoRetorno = resultadoServico.sucesso ? 200 : 401;
  const dadoRetorno = resultadoServico.sucesso
    ? { data: resultadoServico.data }
    : { detalhes: resultadoServico.detalhes };
  return res.status(codigoRetorno).send({
    mensagem: resultadoServico.mensagem,
    ...dadoRetorno,
  });
};

module.exports = { auth };
