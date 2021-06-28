const clienteService = require("../services/cliente.service");

const cria = async (req, res, next) => {
  const { body } = req;

  const result = await clienteService.cria(body);

  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
};

const pesquisarCurtidasRealizadas = async (req, res, next) => {
  return res.status(200).send({
    data: [],
  });
};

const pesquisaPorId = async (req, res, next) => {
  return res.status(200).send({});
};

const listarTodosClientes = async (req, res, next) => {
  const result = await clienteService.listaTodos();

  return res.status(200).send(result);
};

module.exports = {
  cria,
  pesquisaPorId,
  pesquisarCurtidasRealizadas,
  listarTodosClientes,
};
