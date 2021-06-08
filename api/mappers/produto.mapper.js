
const fileUtils = require('../utils/file.util');

const toItemListaDTO = (model) => {

  const { _id, nome, descricao, preco, imagem } = model;

  return {
    id: _id,
    nome,
    descricao,
    preco: `R$ ${preco.toString().replace('.', ',')}`,
    imagem: fileUtils.criaEnderecoDownload('produtos', imagem.nome),
  }

}

module.exports = {
  toItemListaDTO,
}
