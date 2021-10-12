const { produto } = require("../../api/models/index");
const fileUtils = require("../../api/utils/file.util");

const dataProduct = [
	{
		categoria: "615a19fd4384691888d27098",
		fornecedor: "615a584a79b274425a6fa7db",
		nome: "teste-produto01",
		descricao: "teste-produto01-descricao",
		preco: 13.55,
		imagem: {
			nomeOriginal: "boloLimao.jpg",
			nome: fileUtils.criaNome("image/jpeg"),
			tipo: "image/jpeg",
		},
	},
	{
		categoria: "61611e6ff0c5860e72da8757",
		fornecedor: "615a584a79b274425a6fa7db",
		nome: "teste-produto02",
		descricao: "teste-produto02-descricao",
		preco: 20.95,
		imagem: {
			nomeOriginal: "principal2.jpg",
			nome: fileUtils.criaNome("image/jpeg"),
			tipo: "image/jpeg",
		},
	},
];

const createProduct = async () => {
	await produto.create(dataProduct);
};

createProduct();
