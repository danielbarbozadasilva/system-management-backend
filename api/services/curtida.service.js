const { fornecedor, cliente, curtida } = require("../models/index");
const ErrorRegraDeNegocio = require("../utils/errors/erro-regra-negocio");

const criaCurtida = async (fornecedorid, usuarioid) => {
	const [fornecedorDB, clienteDB] = await Promise.all([fornecedor.findById(fornecedorid), cliente.findById(usuarioid)]);

	// if (!fornecedorDB) {
	//   throw new ErrorRegraDeNegocio("o fornecedor pesquisado não existe");
	// }

	const curtidaDB = await curtida.create({
		fornecedor: fornecedorid,
		cliente: usuarioid,
	});

	fornecedorDB.curtidas = [...fornecedorDB.curtidas, curtidaDB._id];
	clienteDB.curtidas = [...clienteDB.curtidas, curtidaDB._id];

	await Promise.all([fornecedorDB.save(), clienteDB.save()]);

	return {
		sucesso: true,
		data: {
			id: curtidaDB._id,
			fornecedor: fornecedorDB.nomeFantasia,
			cliente: clienteDB.nome,
		},
	};
};

const removeCurtida = async (fornecedorid, usuarioid) => {
	const [fornecedorDB, usuarioDB, curtidaDB] = await Promise.all([
		fornecedor.findById(fornecedorid),
		cliente.findById(usuarioid),
		curtida.findOne({ fornecedor: fornecedorid, cliente: usuarioid }),
	]);

	if (!fornecedorDB) {
		throw new ErrorRegraDeNegocio("o fornecedor informado não existe");
	}

	if (!curtidaDB) {
		throw new ErrorRegraDeNegocio("não existem curtidas para os dados informados");
	}

	fornecedorDB.curtidas = fornecedorDB.curtidas.filter((item) => {
		return item.toString() !== curtidaDB._id.toString();
	});

	const curtida_id = curtidaDB._id.toString();

	usuarioDB.curtidas = usuarioDB.curtidas.filter((item) => {
		return item.toString() !== curtidaDB._id.toString();
	});

	await Promise.all([fornecedorDB.save(), usuarioDB.save(), curtida.remove(curtidaDB)]);

	return {
		data: {
			id: curtida_id,
		},
	};
};

module.exports = {
	criaCurtida,
	removeCurtida,
};
