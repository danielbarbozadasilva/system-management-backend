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
    curtidas
  } = model;

  return {
    id: _id,
    nome: nome,
    descricao: descricao,
    fornecedorId: fornecedor,
    categoriaId: categoria,
    categoriaName: categoriaName,
    preco: String(preco),
    imagem: fileUtils.criaEnderecoDownload("produtos", imagem.nome),
    status: status,
    curtidas
  };
};

module.exports = {
  toItemListaDTO,
};
