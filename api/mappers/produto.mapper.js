const fileUtils = require("../utils/file.util");

const toItemListaDTO = (model) => {
	const { _id, nome, descricao, preco, fornecedor, categoria, imagem, status } = model;

	return {
		id: _id,
		nome: nome,
		descricao: descricao,
		preco: String(preco),
		imagem: fileUtils.criaEnderecoDownload("produtos", imagem.nome),
		categoriaId: categoria,
		fornecedorId: fornecedor
	};
};

module.exports = {
	toItemListaDTO,
};
