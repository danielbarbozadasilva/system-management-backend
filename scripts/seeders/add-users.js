const node_environment = process.env.NODE_ENV || "development";

if (node_environment === "development") {
	require("dotenv").config();
}

const db = require("../../db/config");

const mongoose = require("mongoose");
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const { administrador, fornecedor, cliente } = require("../../api/models/index");
const criptografia = require("../../api/utils/criptografia.util");

const createUsers = async () => {
	await administrador.create({
		email: "danielbarboza56@gmail.com",
		nome: "administrador",
		senha: criptografia.criaHash("daniel"),
	}),
	await fornecedor.create({
		cnpj: "03.470.727/0023-36",
		nomeFantasia: "Parme",
		kind: "fornecedor",
		endereco: "Rua abc,10",
		uf: "RJ",
		cidade: "Rio de janeiro",
		responsavel: "Gabriel Dantas",
		telefone: "(21) 3352-1018",
		email: "daniel80barboza@gmail.com",
		senha: criptografia.criaHash("daniel"),
		status: "Inativo",
	}),
	await cliente.create({
		kind: "cliente",
		nome: "Cliente-Daniel",
		data_nascimento: "05/03/1997",
		uf: "RJ",
		cidade: "Rio de janeiro",
		email: "daniel95barboza@gmail.com",
		senha: criptografia.criaHash("daniel"),
		status: "Ativo",
	});
};

createUsers();
