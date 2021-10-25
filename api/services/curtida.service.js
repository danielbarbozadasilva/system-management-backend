const { fornecedor, produto, cliente, curtida } = require("../models/index");
const ErrorRegraDeNegocio = require("../utils/errors/erro-regra-negocio");

const criaCurtidaClienteFornecedor = async (fornecedorid, clienteid) => {
	const fornecedorDB = new Promise(await fornecedor.findById(fornecedorid));
	if (!fornecedorDB) {
		throw new ErrorRegraDeNegocio("O fornecedor informado não existe!");
		return {
			sucesso: false,
		};
	}

	const clienteDB = new Promise(await cliente.findById(clienteid));
	if (!clienteDB) {
		throw new ErrorRegraDeNegocio("A cliente informado não existe!");
		return {
			sucesso: false,
		};
	}

	const curtidaDB = new Promise(await curtida.findOne({ fornecedor: fornecedorid, cliente: clienteid }));
	if (curtidaDB) {
		throw new ErrorRegraDeNegocio("Você já curtiu o fornecedor!");
		return {
			sucesso: false,
		};
	} else if (!curtidaDB) {
		curtidaDB = await curtida.create({
			fornecedor: fornecedorid,
			cliente: clienteid,
		});

		await Promise.all([curtidaDB.save()]);

		return {
			sucesso: true,
			data: {
				id: curtidaDB._id,
				fornecedor: curtidaDB.fornecedor,
				cliente: curtidaDB.cliente,
			},
		};
	};
};

const removeCurtidaClienteFornecedor = async (fornecedorid, clienteid) => {
	try {
		const [fornecedorDB, clienteDB, curtidaDB] = await Promise.all([
			fornecedor.findById(fornecedorid),
			cliente.findById(clienteid),
			curtida.findOne({ fornecedor: fornecedorid, cliente: clienteid }),
		]);
		if (curtidaDB) {
			await Promise.all([curtidaDB.remove()]);

			return {
				sucesso: true,
				message: "Curtida removida com sucesso!",
			};
		} else if (!curtidaDB) {
			throw new ErrorRegraDeNegocio("Você não curtiu o fornecedor!");
			return {
				sucesso: false,
			};
		} else if (!fornecedorDB) {
			throw new ErrorRegraDeNegocio("O fornecedor informado não existe!");
			return {
				sucesso: false,
			};
		} else if (!clienteDB) {
			throw new ErrorRegraDeNegocio("A cliente informado não existe!");
			return {
				sucesso: false,
			};
		}
	} catch (error) {}
};

const criaCurtidaFornecedorProduto = async (fornecedorid, produtoid) => {
	try {
		const [fornecedorDB, produtoDB, curtidaDB] = await Promise.all([
			fornecedor.findById(fornecedorid),
			produto.findById(produtoid),
			curtida.findOne({ fornecedor: fornecedorid, produto: produtoid }),
		])

		if (!curtidaDB) {
			curtidaDB = await curtida.create({
				fornecedor: fornecedorid,
				cliente: clienteid,
			});

			await Promise.all([curtidaDB.save()]);

			return {
				sucesso: true,
				data: {
					id: curtidaDB._id,
					fornecedor: curtidaDB.fornecedor,
					cliente: curtidaDB.cliente,
				},
			};
		} else if (curtidaDB) {
			throw new ErrorRegraDeNegocio("Você já curtiu o fornecedor!");
			return {
				sucesso: false,
			};
		} else if (!fornecedorDB) {
			throw new ErrorRegraDeNegocio("O fornecedor informado não existe!");
			return {
				sucesso: false,
			};
		} else if (!clienteDB) {
			throw new ErrorRegraDeNegocio("A cliente informado não existe!");
			return {
				sucesso: false,
			};
		}
	} catch (error) {}
};

const removeCurtidaFornecedorProduto = async (fornecedorid, clienteid) => {
	try {
		const [fornecedorDB, clienteDB, curtidaDB] = await Promise.all([
			fornecedor.findById(fornecedorid),
			cliente.findById(clienteid),
			curtida.findOne({ fornecedor: fornecedorid, cliente: clienteid }),
		]);
		if (curtidaDB) {
			await Promise.all([curtidaDB.remove()]);

			return {
				sucesso: true,
				message: "Curtida removida com sucesso!",
			};
		} else if (!curtidaDB) {
			throw new ErrorRegraDeNegocio("Você não curtiu o fornecedor!");
			return {
				sucesso: false,
			};
		} else if (!fornecedorDB) {
			throw new ErrorRegraDeNegocio("O fornecedor informado não existe!");
			return {
				sucesso: false,
			};
		} else if (!clienteDB) {
			throw new ErrorRegraDeNegocio("A cliente informado não existe!");
			return {
				sucesso: false,
			};
		}
	} catch (error) {}
};

module.exports = {
	criaCurtidaClienteFornecedor,
	removeCurtidaClienteFornecedor,
	criaCurtidaFornecedorProduto,
	removeCurtidaFornecedorProduto
};
