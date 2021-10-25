const produtoService = require("../services/produto.service");
const curtidaService = require("../services/curtida.service");

const listarProdutos = async (req, res, next) => {
	const { query } = req;
	const result = await produtoService.pesquisaPorFiltros(query);
	return res.status(200).send({ data: result });
};

const listaId = async (req, res, next) => {
	const { id } = req.params;
	const result = await produtoService.pesquisa(id);
	return res.status(200).send({ data: result });
};

const alterarProduto = async (req, res, next) => {
	const { params, body } = req;
	const resultadoServico = await produtoService.alteraProduto(params.produtoid, body);

	const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
	const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };
	return res.status(codigoRetorno).send(dadoRetorno);
};

const inserirProduto = async (req, res, next) => {
	const { body, params, usuario } = req;

	const resultadoServico = await produtoService.cria({
		...params,
		...body,
		fornecedorlogadoid: req.params.fornecedor,
	});

	return res.status(200).send({
		mensagem: "Operacao realizada com sucesso.",
		data: resultadoServico.data,
	});
};



const listaProdutoPorId = async (req, res, next) => {
	const { query } = req;
	const result = await produtoService.pesquisaPorFiltros(query);
	return res.status(200).send({ data: result });
};

const removeProduto = async (req, res, next) => {
	const { fornecedorid, produtoid } = req.params;
	const { usuario } = req;

	const resultadoServico = await produtoService.deleta({
		fornecedorId: fornecedorid,
		produtoId: produtoid,
		usuarioId: req.usuario.id,
	});

	const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
	const dadoRetorno = resultadoServico.sucesso ? { mensagem: resultadoServico.mensagem, data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };
	return res.status(codigoRetorno).send(dadoRetorno);
};

const curtirProduto = async (req, res, next) => {
	const { params, usuario } = req;
	const { fornecedorid, produtoid } = req.params;

	const result = await curtidaService.criaCurtidaFornecedorProduto(fornecedorid, produtoid);
	console.log('++++++++++++++++++'+result)
	const codigoRetorno = result.sucesso ? 200 : 400;
	const dadoRetorno = result.sucesso ? { data: result.data } : { detalhes: result.detalhes };

	return res.status(codigoRetorno).send(dadoRetorno);
};

const removerProdutoCurtidas = async (req, res, next) => {
	const { usuario, params } = req;
	const result = await curtidaService.removeCurtidaFornecedorProduto(params.fornecedorid, params.produtoid);
	const codigoRetorno = result.sucesso ? 200 : 400;
	const dadoRetorno = result.sucesso ? { data: result.data } : { detalhes: result.detalhes };
	return res.status(codigoRetorno).send(dadoRetorno);
};

module.exports = {
	inserirProduto,
	removeProduto,
	listarProdutos,
	listaProdutoPorId,
	alterarProduto,
	listaId,
	curtirProduto,
	removerProdutoCurtidas,
};
