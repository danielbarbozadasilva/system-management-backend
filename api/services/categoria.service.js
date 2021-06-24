const { categoria, produto } = require("../models/index");
const categoriaMapper = require("../mappers/categoria.mapper");
const fileUtils = require("../utils/file.util");

const buscaPorId = async (categoriaid) => {
  const categoriaDB = await categoria.findById(categoriaid);

  if (categoriaDB) return categoriaMapper.toDTO(categoriaDB);

  return;
};

const getCategoriaProduto = async (req) => {
  const { id } = req.params;
  return (await categoria.findById(id).populate("produtos"))?.produtos;
};

const pesquisaPorFiltros = async (filtros) => {
  const filtroMongo = {};

  if (filtros.categoria) filtroMongo.categoria = filtros.categoria;

  if (filtros.fornecedor) filtroMongo.fornecedor = filtros.fornecedor;

  if (filtros.nomelike)
    filtroMongo.nome = { $regex: ".*" + filtros.nomelike + ".*" };

  const resultadoDB = await produto.find(filtroMongo);

  return resultadoDB.map((item) => {
    return categoriaMapper.toItemListaDTO(item);
  });
};

const listaTodos = async () => {
  const listaCategoriasDB = await categoria.find({});

  return listaCategoriasDB.map((categortiaDB) => {
    return categoriaMapper.toItemListaDTO(categortiaDB);
  });
};

const criaCategoria = async (model) => {
  const novaCategoria = await categoria.create({
    nome: model.nome,
    descricao: model.descricao,
    status: model.status,
    imagem: {
      nomeOriginal: model.imagem.nomeOriginal,
      nome: model.imagem.novoNome,
      tipo: model.imagem.tipo,
    },
  });

  fileUtils.move(model.imagem.caminhoOriginal, model.imagem.novoCaminho);

  return {
    sucesso: true,
    mensagem: "cadastro realizado com sucesso",
    data: categoriaMapper.toDTO(novaCategoria),
  };
};

const deleta = async (categoriaId) => {
  const categoriaDB = await categoria.findOne({ _id: categoriaId });

  const categoriaDBAsJson = categoriaDB.toJSON();

  if (!categoriaDB) {
    throw new ErroRegraDeNegocio("");

    return {
      sucesso: false,
      mensagem: "não foi possível realizar a operação",
      detalhes: ['"categoriaid" não existe.']
    };
  }

  const { imagem } = categoriaDB;
  fileUtils.remove("categoria", imagem.nome);

  await categoria.remove(categoriaDB);

  return {
    sucesso: true,
    mensagem: "Operação realizada com sucesso.",
  };
};

const alteraCategoria = async (categoriaId, model) => {
  const categoriaDB = await categoria.findOne({ _id: categoriaId });

  if (!categoriaDB) {
    return {
      sucesso: false,
      mensagem: "não foi possível realizar a operação",
      detalhes: ['"categoriaid" não existe.'],
    };
  }

  categoriaDB.nome = model.nome;
  categoriaDB.descricao = model.descricao;
  categoriaDB.status = model.status;

  if (typeof model.imagem === "object") {
    fileUtils.remove("categoria", categoriaDB.imagem.nome);
    fileUtils.move(model.imagem.caminhoOriginal, model.imagem.novoCaminho);
    categoriaDB.imagem = {
      nomeOriginal: model.imagem.nomeOriginal,
      nome: model.imagem.novoNome,
      tipo: model.imagem.tipo,
    };
  }

  await categoriaDB.save();

  return {
    sucesso: true,
    mensagem: "operação relaizada com sucesso",
    data: categoriaMapper.toDTO(categoriaDB),
  };
};

module.exports = {
  buscaPorId,
  criaCategoria,
  alteraCategoria,
  listaTodos,
  deleta,
  pesquisaPorFiltros,
  getCategoriaProduto,
  
};
