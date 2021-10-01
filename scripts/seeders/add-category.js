const { categoria } = require("../../api/models/index");
const node_environment = process.env.NODE_ENV || "development";

if (node_environment === "development") {
	require("dotenv").config();
}

const db = require("../../db/config");

const mongoose = require("mongoose");
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const createCategory = async () => {
	await categoria.create({
		nome: "teste-category02",
		descricao: "teste-category02-descricao",
		status: true,
		imagem: {
			nomeOriginal: "boloLimao.jpg",
			nome: "001cbd16-2828-449b-a1e8-570eb84619e3.jpeg",
			tipo: "image/jpeg",
		}
	})
}

createCategory();
