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

const pesquisaPorId = async (req, res, next) => {
  const {params} = req
  const result = await clienteService.pesquisaPorId(params.clienteid);

  return res.status(200).send(result);
};

const listarTodosClientes = async (req, res, next) => {
  const result = await clienteService.listaTodos();

  return res.status(200).send(result);
};

module.exports = {
  cria,
  pesquisaPorId,
  listarTodosClientes,
};
