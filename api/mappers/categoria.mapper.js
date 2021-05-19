const fileUtils = require('../utils/file.util');


/* O item de uma lista, o DTO para o item de uma lista, para quando
 eu for devolver uma lista de categorias */ 
const toItemListaDTO = (model) => {

  const { _id, nome, descricao, status, imagem } = model;

  return {
    id: _id,
    nome,
    descricao,
    status,
    imagem: fileUtils.criaEnderecoDownload('categorias', imagem.nome),
  }

}

/* DTO para uma única categoria */ 
const toDTO = (model) => {

  const { _id, nome, descricao, status, imagem } = model;

  return {
    id: _id,
    nome,
    descricao,
    status,
    imagem: fileUtils.criaEnderecoDownload('categorias', imagem.nome),
  }

}

module.exports = {
  toDTO,
  toItemListaDTO,
}
