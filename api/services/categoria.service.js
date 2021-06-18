const { categoria, produto } = require('../models/index');
const categoriaMapper = require('../mappers/categoria.mapper');
const fileUtils = require('../utils/file.util');


const buscaPorId = async (categoriaid) => {

  const categoriaDB = await categoria.findById(categoriaid);

  if (categoriaDB)
    return categoriaMapper.toDTO(categoriaDB);

  return;

}


const listaAvancada = async (req) => {
  const { id } = req.params;
  return (await categoria.findById(id).populate('produtos'))?.produtos
}


const pesquisaPorFiltros = async (filtros) => {

  const filtroMongo = {};

  // se eu tenho o valor eu anexo ao meu filtro senão passa batido
  if (filtros.categoria)
    filtroMongo.categoria = filtros.categoria;

  // se eu tenho o valor eu anexo ao meu filtro senão passa batido
  if (filtros.fornecedor)
    filtroMongo.fornecedor = filtros.fornecedor;

  // se eu tenho o valor eu anexo ao meu filtro senão passa batido
  if (filtros.nomelike)
    filtroMongo.nome = { $regex: '.*' + filtros.nomelike + '.*' };

  const resultadoDB = await produto.find(filtroMongo);

  return resultadoDB.map(item => {
    // substituir por DTO
    return categoriaMapper.toItemListaDTO(item);
  });

}

const listaTodos = async () => {

  const listaCategoriasDB = await categoria.find({});

  return listaCategoriasDB.map(categortiaDB => {

    return categoriaMapper.toItemListaDTO(categortiaDB);

  });

}

const criaCategoria = async (model) => {

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

  // mover arquivo para destino definitivo
  fileUtils.move(model.imagem.caminhoOriginal, model.imagem.novoCaminho);

  return {
    sucesso: true,
    mensagem: 'cadastro realizado com sucesso',
    data: categoriaMapper.toDTO(novaCategoria)
  }

}

const deleta = async (categoriaId) => {

  // localizar documento
  const categoriaDB = await categoria.findOne({ _id: categoriaId });

  console.log(categoriaDB);

  const categoriaDBAsJson = categoriaDB.toJSON();

  console.log(categoriaDBAsJson);

  if (!categoriaDB) {

    throw new ErroRegraDeNegocio('')

    return {
      sucesso: false,
      mensagem: 'não foi possível realizar a operação',
      detalhes: [
        '"categoriaid" não existe.'
      ]
    };
  }

  // criar tratamento para quando existem produtos associados a categoria

  // destruir a imagem
  const { imagem } = categoriaDB;
  fileUtils.remove('categoria', imagem.nome);

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

  if (typeof model.imagem === "object") {
    // remover arquivo existente
    fileUtils.remove('categoria', categoriaDB.imagem.nome);
    // mover arquivo para destino definitivo
    fileUtils.move(model.imagem.caminhoOriginal, model.imagem.novoCaminho);
    // salvar na base
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
  pesquisaPorFiltros,
  listaAvancada
}
