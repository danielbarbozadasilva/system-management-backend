
const fileUtils = require('../utils/file.util');

const toItemListaDTO = (model) => {

  const { _id, nome, descricao, preco, categoria, fornecedor, imagem } = model;

  return {
    id: _id,
    nome,
    descricao,
    preco: `R$ ${preco.toString().replace('.', ',')}`,
    categoria,
    fornecedor,
    imagem: fileUtils.criaEnderecoDownload('produtos', imagem.nome),
  }

}

module.exports = {
  toItemListaDTO,
}
