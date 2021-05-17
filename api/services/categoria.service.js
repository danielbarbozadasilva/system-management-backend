
const { categoria } = require('../models/index');
const categoriaMapper = require('../mappers/categoria.mapper');
const fileUtils = require('../utils/file.util');


const listaTodos = async () => {

  const listaCategoriasDB = await categoria.find({});

  return listaCategoriasDB.map(categortiaDB => {

    return categoriaMapper.toDTO(categortiaDB);

  });

}

const criaCategoria = async (model) => {

  // Tratar nomes repetidos e  incluir nova categoria
  const novaCategoria = await categoria.create({
    nome: model.nome,
    descricao: model.descricao,
    status: model.status,
    imagem: {
      originalname: model.imagem.nomeOriginal,
      nome: model.imagem.novoNome,
      tipo: model.imagem.tipo
    }
  })
console.log(novaCategoria)
  // Altero o caminho do original para destino definitivo (novo)
  fileUtils.move(model.imagem.caminhoOriginal, model.imagem.novoCaminho);

  return {
    sucesso: true,
    mensagem: 'cadastro realizado com sucesso',
    data: categoriaMapper.toDTO(novaCategoria)
  }

}


module.exports = {
  criaCategoria,
  listaTodos,
}
