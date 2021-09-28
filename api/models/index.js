const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createSchema = (modelPai, model, options = {}) => {
	return new Schema(
		{
			...modelPai,
			...model,
		},
		{
			timestamps: true,
			collection: "UsuariosCollection",
			...options,
		}
	);
};

const usuarioSchema = require("./model.usuario");

const usuario = mongoose.model(
	"usuario",
	createSchema(undefined, usuarioSchema, {
		discriminatorKey: "kind",
	})
);

const administradorSchema = require("./model.administrador");
const administrador = usuario.discriminator("administrador", createSchema(usuarioSchema, administradorSchema, {}));

const fornecedorSchema = require("./model.fornecedor");
const fornecedor = usuario.discriminator("fornecedor", createSchema(usuarioSchema, fornecedorSchema, {}));

const clienteSchema = require("./model.cliente");
const cliente = usuario.discriminator("cliente", createSchema(usuarioSchema, clienteSchema, {}));

const categoriaSchema = require("./model.categoria");
const categoria = mongoose.model(
	"categoria",
	createSchema(undefined, categoriaSchema, {
		collection: "CategoriaCollection",
		toJSON: {
			virtuals: true,
		},
	})
);

const produtoSchema = require("./model.produto");
const produto = mongoose.model(
	"produto",
	createSchema(undefined, produtoSchema, {
		collection: "ProdutoCollection",
		toJSON: {
			virtuals: true,
		},
	})
);

const curtidaSchema = require("./model.curtida");
const curtida = mongoose.model(
	"curtida",
	createSchema(undefined, curtidaSchema, {
		collection: "curtidaCollection",
		toJSON: {
			virtuals: true,
		},
	})
);

module.exports = {
	categoria,
	usuario,
	administrador,
	fornecedor,
	produto,
	curtida,
	cliente,
};
