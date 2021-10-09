const { produto } = require("../api/models/index");

const dataProduct = [
	{
		idCategory: "615a19fd4384691888d27098",
		idProvider: "615a584a79b274425a6fa7db",
		nome: "teste-categoria01",
		descricao: "teste-categoria01-descricao",
		status: true,
		imagem: {
			nomeOriginal: "boloLimao.jpg",
			nome: fileUtils.criaNome("image/jpeg"),
			tipo: "image/jpeg",
		},
	},
	{
		idCategory: "61611e6ff0c5860e72da8757",
		idProvider: "615a584a79b274425a6fa7db",
		nome: "teste-categoria02",
		descricao: "teste-categoria02-descricao",
		status: true,
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
