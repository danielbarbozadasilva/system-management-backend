const fileUtils = require('../utils/file.util');

const toItemListaDTO = (model) => {

  const { _id, nome, descricao, status, imagem } = model;

  return {
    id: _id,
    nome,
    descricao,
    status,
    imagem: fileUtils.criaEnderecoDownload('categoria', imagem.nome),
  }
}

const toDTO = (model) => {

  const { _id, nome, descricao, status, imagem } = model;

  return {
    id: _id,
    nome,
    descricao,
    status,
    imagem: fileUtils.criaEnderecoDownload('categoria', imagem.nome),
  }
}

module.exports = {
  toDTO,
  toItemListaDTO
}
