const { categoria } = require('../models/index');
const categoriaMapper = require('../mappers/categoria.mapper');
const fileUtils = require('../utils/file.util');


// const validaSeCategoriaExiste = (categoriaId) => {

//   const categoriaDB = await categoria.findOne({ _id: categoriaId });

//   if (!categoriaDB) {
//     return {
//       sucesso: false,
//       detalhes: [
//         '"categoriaid" não existe.'
//       ]
//     };
//   }

//   return {
//     sucesso: true,
//     data: categoriaDB
//   }

// }



const buscaPorId = async (categoriaid) => {

  const categoriaDB = await categoria.findById(categoriaid);

  if (categoriaDB)
    return categoriaMapper.toDTO(categoriaDB);

  return;

}

const listaTodos = async () => {

  const listaCategoriasDB = await categoria.find({});

  return listaCategoriasDB.map(categortiaDB => {

    return categoriaMapper.toItemListaDTO(categortiaDB);

  });

}

const criaCategoria = async (model) => {

  //TODO: tratar nomes repetidos


  //TODO: incluir nova categoria

  const novaCategoria = await categoria.create({
    nome: model.nome,
    descricao: model.descricao,
    status: model.status,
    imagem: {
      nomeOriginal: model.imagem.nomeOriginal,
      nome: model.imagem.novoNome,
      tipo: model.imagem.tipo,
    }
  })

  //TODO: mover arquivo para destino definitivo
  fileUtils.move(model.imagem.caminhoOriginal, model.imagem.novoCaminho);

  return {
    sucesso: true,
    mensagem: 'cadastro realizado com sucesso',
    data: categoriaMapper.toDTO(novaCategoria)
  }

}

const deleta = async (categoriaId) => {

  //TODO: localizar documento
  const categoriaDB = await categoria.findOne({ _id: categoriaId });

  console.log(categoriaDB);

  const categoriaDBAsJson = categoriaDB.toJSON();

  console.log(categoriaDBAsJson);

  if (!categoriaDB) {

    return {
      sucesso: false,
      mensagem: 'não foi possível realizar a operação',
      detalhes: [
        '"categoriaid" não existe.'
      ]
    };
  }

  //TODO: criar tratamento para quando existem produtos associados a categoria

  //TODO: destruir a imagem
  const { imagem } = categoriaDB;
  fileUtils.remove('categorias', imagem.nome);

  //TODO: deleta do banco
  await categoria.remove(categoriaDB);

  return {
    sucesso: true,
    mensagem: 'Operação realizada com sucesso.'
  }


}

const alteraCategoria = async (categoriaId, model) => {

  const categoriaDB = await categoria.findOne({ _id: categoriaId });

  if (!categoriaDB) {
    return {
      sucesso: false,
      mensagem: 'não foi possível realizar a operação',
      detalhes: [
        '"categoriaid" não existe.'
      ]
    };
  }


  categoriaDB.nome = model.nome;
  categoriaDB.descricao = model.descricao;
  categoriaDB.status = model.status;

  if (model.imagem) {
    //TODO: remover arquivo existente
    fileUtils.remove('categorias', categoriaDB.imagem.nome);
    //TODO: mover arquivo para destino definitivo
    fileUtils.move(model.imagem.caminhoOriginal, model.imagem.novoCaminho);
    //TODO: salvar na base
    categoriaDB.imagem = {
      nomeOriginal: model.imagem.nomeOriginal,
      nome: model.imagem.novoNome,
      tipo: model.imagem.tipo,
    }
  }

  await categoriaDB.save();

  return {
    sucesso: true,
    mensagem: 'operação relaizada com sucesso',
    data: categoriaMapper.toDTO(categoriaDB),
  }

}

module.exports = {
  buscaPorId,
  criaCategoria,
  alteraCategoria,
  listaTodos,
  deleta,

}
