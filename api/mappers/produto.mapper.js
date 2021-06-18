

const fileUtils = require('../utils/file.util');

const toItemListaDTO = (model) => {

  const { _id, nome, descricao, preco, imagem, categoria, fornecedor } = model;

  return {
    id: _id,
    nome,
    descricao,
    fornecedorId: fornecedor,
    categoriaName: categoria.nome,
    categoriaId: categoria._id,
    preco: `R$ ${preco.toString().replace('.', ',')}`,
    imagem: fileUtils.criaEnderecoDownload('produtos', imagem.nome),
  }

}

module.exports = {
  toItemListaDTO,
}
