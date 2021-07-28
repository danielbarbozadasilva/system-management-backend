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
  console.log('id' + _id)
  console.log("imagem.nome" + imagem.nome);

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
  };
};

module.exports = {
  toItemListaDTO,
};
