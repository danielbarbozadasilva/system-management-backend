const fileUtils = require("../utils/file.util");

const toItemListaDTO = (model) => {
  const {
    _id,
    nome,
    descricao,
    preco,
    status,
    imagem,
    categoria,
    fornecedor,
    categoriaId,
    categoriaName,
  } = model;

  return {
    id: _id,
    nome,
    descricao,
    fornecedorId: fornecedor,
    categoriaId: categoriaId,
    categoriaName: categoriaName,
    preco: preco,
    imagem: fileUtils.criaEnderecoDownload("produtos", imagem.nome),
    status: status,
  };
};

module.exports = {
  toItemListaDTO,
};
