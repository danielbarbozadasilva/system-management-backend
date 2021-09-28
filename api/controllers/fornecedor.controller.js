const fornecedorService = require("../services/fornecedor.service");
const curtidaService = require("../services/curtida.service");
const produtoMapper = require("../mappers/produto.mapper");
const { produto, categoria, fornecedor } = require("../models/index");

const activeProvider = async (req, res, next) => {
	const { fornecedorid } = req.params;

	const resultadoServico = await fornecedorService.alteraStatus(fornecedorid, "Ativo");
	const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
	const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

	return res.status(codigoRetorno).send({
		...dadoRetorno,
	});
};

const disableProvider = async (req, res, next) => {
	const { fornecedorid } = req.params;

	const resultadoServico = await fornecedorService.alteraStatus(fornecedorid, "Inativo");

	const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
	const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

	return res.status(codigoRetorno).send({
		mensagem: "operaçao realizada com sucesso",
		...dadoRetorno,
	});
};

const insertProvider = async (req, res, next) => {
	const { body } = req;
	const result = await fornecedorService.createProvider(body);

	const codigoRetorno = result.sucesso ? 200 : 400;
	const dadoRetorno = result.sucesso ? { data: result.data } : { detalhes: result.detalhes };

	return res.status(codigoRetorno).send(dadoRetorno);
};

const updateProvider = async (req, res, next) => {
	const { body } = req;
	const fornecedorid  = req.params.id;
	const result = await fornecedorService.updateProvider(fornecedorid, body);

	const codigoRetorno = result.sucesso ? 200 : 400;
	const dadoRetorno = result.sucesso ? { data: result.data } : { detalhes: result.detalhes };

	return res.status(codigoRetorno).send(dadoRetorno);
};

const buscaPorId = async (req, res, next) => {
	const { fornecedorid } = req.params;

	const result = await fornecedorService.listarPorId(fornecedorid);

	const codigoRetorno = result.sucesso ? 200 : 400;
	const dadoRetorno = result.sucesso ? { data: result.data } : { detalhes: result.detalhes };

	return res.status(codigoRetorno).send(dadoRetorno);
};

const listafornecedores = async (req, res, next) => {
	const resultadoDB = await fornecedorService.listaTodos();
	return res.status(200).send(resultadoDB);
};

const getPesquisarfornecedorLocalidade = async (req, res, next) => {
	const { uf, cidade } = req.query;
	let filtro = {};
	if (cidade == undefined || cidade == "x") {
		filtro = { uf };
	} else {
		filtro = { uf, cidade };
	}
	const resultadoDB = await fornecedor.find(filtro);
	return res.send(resultadoDB);
};

const listaProdutosByfornecedor = async (fornecedorid, fornecedorlogadoid) => {
	const fornecedorFromDB = await fornecedor.findById(fornecedorid).populate("produtos");
	const fornecedorAsJSON = fornecedorFromDB.toJSON();
	return fornecedorAsJSON.produtos.map((item) => {
		return produtoMapper.toItemListaDTO(item);
	});
};

const pesquisarCurtidasRecebidas = async (req, res, next) => {
	const { fornecedorid } = req.params;

	const result = await fornecedorService.fornecedorCurtidaProduto(fornecedorid);
	return res.status(200).send(result);
};

const buscaProdutosPorfornecedor = async (req, res, next) => {
	const id = req.params.fornecedorid;
	const data = await fornecedorService.listaProdutosPorfornecedor(id);

	return res.status(200).send({ data });
};

module.exports = {
	activeProvider,
	disableProvider,
	insertProvider,
	updateProvider,
	listafornecedores,
	buscaPorId,
	pesquisarCurtidasRecebidas,
	buscaProdutosPorfornecedor,
	listaProdutosByfornecedor,
	getPesquisarfornecedorLocalidade,
};
