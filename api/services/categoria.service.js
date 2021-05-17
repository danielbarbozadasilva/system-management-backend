
const { categoria } = require('../models/index');
const categoriaMapper = require('../mappers/categoria.mapper');

const listaTodos = async () => {

  // Retorna uma coleção vazia
  const listaCategoriasDB = await categoria.find({});

  return listaCategoriasDB.map(categortiaDB => {

    return categoriaMapper.toDTO(categortiaDB);

  });

}

const criaCategoria = async (model) => {

  // tratar nomes repetidos
  // incluir nova categoria
  const novaCategoria = await categoria.create({
    nome: model.nome,
    descricao: model.descricao,
    status: model.status
  })

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