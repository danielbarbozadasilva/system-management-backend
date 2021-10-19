const { fornecedor, produto, curtida } = require("../models/index");
const ErrorRegraDeNegocio = require("../utils/errors/erro-regra-negocio");

const criaCurtida = async (fornecedorid, produtoid) => {
	try {
		const [fornecedorDB, produtoDB, curtidaDB] = await Promise.all([
			fornecedor.findById(fornecedorid),
			produto.findById(produtoid),
			curtida.findOne({ fornecedor: fornecedorid, produto: produtoid }),
		]);
	} catch (error) {
		if (!fornecedorDB) {
			throw new ErrorRegraDeNegocio("o fornecedor informado não existe");
			return {
				sucesso: false,
			};
		} else if (!produtoDB) {
			throw new ErrorRegraDeNegocio("produto informado não existe");
			return {
				sucesso: false,
			};
		}
	}

	curtidaDB = await curtida.create({
		fornecedor: fornecedorid,
		produto: produtoid,
	});

	await Promise.all([curtidaDB.save()]);

	return {
		sucesso: true,
		data: {
			id: curtidaDB._id,
			fornecedor: curtidaDB.fornecedor,
			produto: curtidaDB.produto,
		},
	};
};

const removeCurtida = async (fornecedorid, produtoid) => {
	try {
		const [fornecedorDB, produtoDB, curtidaDB] = await Promise.all([
			fornecedor.findById(fornecedorid),
			produto.findById(produtoid),
			curtida.findOne({ fornecedor: fornecedorid, produto: produtoid }),
		]);
		const curtida_id = curtidaDB._id.toString();
		await Promise.all([curtida.remove(curtidaDB)]);
		return {
			sucesso: true,
			data: {
				id: curtida_id,
			},
		};
	} catch (error) {
		if (!fornecedorDB) {
			throw new ErrorRegraDeNegocio("o fornecedor informado não existe");
			return {
				sucesso: false,
			};
		} else if (!produtoDB) {
			throw new ErrorRegraDeNegocio("produto informado não existe");
			return {
				sucesso: false,
			};
		} else if (!curtidaDB) {
			throw new ErrorRegraDeNegocio("A curtida não existe");
			return {
				sucesso: false,
			};
		}
	}
};

module.exports = {
	criaCurtida,
	removeCurtida,
};
