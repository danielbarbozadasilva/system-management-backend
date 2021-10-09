const { administrador, fornecedor, cliente } = require("../../api/models/index");
const criptografia = require("../../api/utils/criptografia.util");
const node_environment = process.env.NODE_ENV || "development";
const md5 = require("md5");

if (node_environment === "development") {
	require("dotenv").config();
}

const db = require("../../db/config");

const mongoose = require("mongoose");
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const createUsers = async () => {
	await administrador.create({
		email: "danielbarboza56@hotmail.com",
		nome: "administrador",
		senha: md5(`daniel${process.env.MD5_SECRET}`),
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
			senha: md5(`daniel${process.env.MD5_SECRET}`),
			status: "Inativo",
		}),
		await cliente.create({
			kind: "cliente",
			nome: "Cliente-Daniel",
			data_nascimento: "05/03/1997",
			uf: "RJ",
			cidade: "Rio de janeiro",
			email: "daniel95barboza@gmail.com",
			senha: md5(`daniel${process.env.MD5_SECRET}`),
			status: "Ativo",
		});
};

createUsers();