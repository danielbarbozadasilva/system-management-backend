const { categoria } = require("../../api/models/index")

const createCategory = async () => {
	await categoria.create({
		nome: "teste-category01",
		descricao: "teste-category01-descricao",
		status: true,
		imagem: {
			nomeOriginal: "boloLimao.jpg",
			nome: "001cbd16-2828-449b-a1e8-570eb84619e3.jpeg",
			tipo: "image/jpeg",
		},
	});
};

createCategory();
