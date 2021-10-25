const { fornecedor, curtida, cliente } = require("../models/index");

const { toListItemDTO, toDTOLikeCase } = require("../mappers/fornecedor.mapper");
const { validaSeEmailJaExiste, validaSeCnpjJaExiste, buscaTipoUsuarioPorId } = require("../services/usuario.service");
const { criaHash } = require("../utils/criptografia.util");
const emailUtils = require("../utils/email.utils");
const { EmailHabilitar } = require("../utils/email.mensagem.habilitar");
const { EmailDesativar } = require("../utils/email.mensagem.desativar");

const createProvider = async (model) => {
	const { cnpj, nomeFantasia, endereco, uf, cidade, responsavel, telefone, email, senha, status } = model;

	if (await validaSeCnpjJaExiste(cnpj))
		return {
			sucesso: false,
			mensagem: "operação não pode ser realizada",
			detalhes: ["Já existe fornecedor cadastrado para o cnpj informado"],
		};

	if (await validaSeEmailJaExiste(email))
		return {
			sucesso: false,
			mensagem: "operação não pode ser realizada",
			detalhes: ["Já existe usuário cadastrado para o email informado"],
		};

	const newProvider = await fornecedor.create({
		cnpj,
		nomeFantasia,
		endereco,
		uf,
		cidade,
		responsavel,
		telefone,
		email,
		senha: criaHash(senha),
		status: "Analise",
	});
	return {
		sucesso: true,
		mensagem: "Operação realizada com sucesso",
		data: {
			...toDTOLikeCase(newProvider),
		},
	};
};

const updateProvider = async (fornecedorid, body) => {
	const { cnpj, nomeFantasia, endereco, uf, cidade, responsavel, telefone, email, senha, status } = body;

	if (await validaSeCnpjJaExiste(cnpj)) {
		return {
			sucesso: false,
			mensagem: "operação não pode ser realizada",
			detalhes: ["Já existe fornecedor cadastrado para o cnpj informado"],
		};
	}

	if (await validaSeEmailJaExiste(email)) {
		return {
			sucesso: false,
			mensagem: "operação não pode ser realizada",
			detalhes: ["Já existe usuário cadastrado para o email informado"],
		};
	}

	const newProvider = await fornecedor.update(
		{ _id: fornecedorid },
		{
			$set: {
				cnpj: cnpj,
				nomeFantasia: nomeFantasia,
				endereco: endereco,
				uf: uf,
				cidade: cidade,
				responsavel: responsavel,
				telefone: telefone,
				email: email,
				senha: criaHash(senha),
				status: "Analise",
			},
		}
	);

	return {
		sucesso: true,
		mensagem: "Operação realizada com sucesso",
		data: {
			...toDTOLikeCase(newProvider),
		},
	};
};

const listAll = async () => {
	const resultadoDB = await fornecedor.find({}).sort({ nomeFantasia: 1 });
	return resultadoDB;
};

const alteraStatus = async (id, status) => {
	const fornecedorDB = await fornecedor.findById(id);

	if (!fornecedorDB) {
		return {
			sucesso: false,
			mensagem: "operação não pode ser realizada",
			detalhes: ["Não existe fornecedor cadastrado para o fornecedor id informado"],
		};
	}

	fornecedorDB.status = status;

	await fornecedorDB.save();

	if (status === "Ativo") {
		emailUtils.enviar({
			destinatario: fornecedorDB.email,
			remetente: process.env.SENDGRID_REMETENTE,
			assunto: `Confirmação de Ativação ${fornecedorDB.nomeFantasia}`,
			corpo: EmailHabilitar("titulo", "menssagem", `${process.env.URL}/signin`),
		});
	}

	if (status === "Inativo") {
		emailUtils.enviar({
			destinatario: fornecedorDB.email,
			remetente: process.env.SENDGRID_REMETENTE,
			assunto: `Confirmação de Inativação ${fornecedorDB.nomeFantasia}`,
			corpo: EmailDesativar("titulo", "menssagem", `${process.env.URL}/signin`),
		});
	}

	return {
		sucesso: true,
		mensagem: "Operação realizada com sucesso",
		data: {
			...toListItemDTO(fornecedorDB.toJSON()),
		},
	};
};


const listLikeClient = async (filtro) => {
	const resultadoDB = await fornecedor.find({ _id: filtro }).populate({
		path: "curtidas",
		model: "curtida",
		populate: {
			path: "clientes",
			model: "cliente",
		},
	});

	return resultadoDB;
};

const listProductsProvider = async (fornecedorid) => {
	const fornecedorFromDB = await fornecedor.findById({ _id: fornecedorid }).populate("produtos");
	return fornecedorFromDB;
};

const listProviderById = async (fornecedorid) => {
	const fornecedorDB = await fornecedor.findById(fornecedorid);

	if (!fornecedorDB) {
		return {
			sucesso: false,
			mensagem: "operação não pode ser realizada",
			detalhes: ["o fornecedor pesquisado não existe"],
		};
	}

	return {
		sucesso: true,
		data: fornecedorDB.toJSON(),
	};
};

module.exports = {
	createProvider,
	updateProvider,
	alteraStatus,
	listProviderById,
	listProductsProvider,
	listAll,
	listLikeClient
};
