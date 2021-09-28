const clienteService = require("../services/cliente.service");
const curtidaService = require("../services/curtida.service");

const cria = async (req, res, next) => {
	const { body } = req;

	const result = await clienteService.cria(body);

	const codigoRetorno = result.sucesso ? 200 : 400;
	const dadoRetorno = result.sucesso ? { data: result.data } : { detalhes: result.detalhes };

	return res.status(codigoRetorno).send(dadoRetorno);
};

const pesquisaPorId = async (req, res, next) => {
	const { params } = req;
	const result = await clienteService.pesquisaPorId(params.clienteid);

	return res.status(200).send(result);
};

const listarTodosClientes = async (req, res, next) => {
	const result = await clienteService.listaTodos();

	return res.status(200).send(result);
};

const curtefornecedor = async (req, res, next) => {
	const { params, usuario } = req;
	const { fornecedorid } = req.params;

	const result = await curtidaService.criaCurtida(fornecedorid, usuario.id);
	const codigoRetorno = result.sucesso ? 200 : 400;
	const dadoRetorno = result.sucesso ? { data: result.data } : { detalhes: result.detalhes };

	return res.status(codigoRetorno).send(dadoRetorno);
};

const removeCurtidafornecedor = async (req, res, next) => {
	const { usuario, params } = req;
	const result = await curtidaService.removeCurtida(params.fornecedorid, usuario.id);
	const codigoRetorno = result.sucesso ? 200 : 400;
	const dadoRetorno = result.sucesso ? { data: result.data } : { detalhes: result.detalhes };
	return res.status(codigoRetorno).send(dadoRetorno);
};

module.exports = {
	cria,
	pesquisaPorId,
	listarTodosClientes,
	curtefornecedor,
	removeCurtidafornecedor,
};
