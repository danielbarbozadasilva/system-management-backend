const toDTO = (model) => {

  const { _id, nome, status, imagem } = model;

  return {
    id: _id,
    nome,
    status,
    imagem: `/static/categorias/${imagem.nome}`
  }

}


module.exports = {
  toDTO,
}
