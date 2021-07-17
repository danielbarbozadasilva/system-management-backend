const { produto, categoria, fornecedor } = require("../models/index");
const fileUtils = require("../utils/file.util");
const produtoMapper = require("../mappers/produto.mapper");

const cria = async (model) => {
  const [categoriaDB, fornecedorDB] = await Promise.all([
    categoria.findById(model.categoriaid),
    fornecedor.findById(model.fornecedorid),
  ]);

  if (!fornecedorDB) {
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: [
        "Não existe fornecedor cadastrado para o fornecedor id informado",
      ],
    };
  };

  if (!categoriaDB) {
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: [
        "Não existe categoria cadastrada para o categoria id informado",
      ],
    };
  }

  const novoProduto = await produto.create({
    nome: model.nome,
    descricao: model.descricao,
    preco: model.preco,
    categoria: model.categoriaid,
    fornecedor: model.fornecedorid,
    imagem: {
      nomeOriginal: model.imagem.nomeOriginal,
      nome: model.imagem.novoNome,
      tipo: model.imagem.tipo,
    },
  });

  categoriaDB.produtos = [...categoriaDB.produtos, novoProduto._id];
  fornecedorDB.produtos = [...fornecedorDB.produtos, novoProduto._id];

  await Promise.all([categoriaDB.save(), fornecedorDB.save()]);

  fileUtils.move(model.imagem.caminhoOriginal, model.imagem.novoCaminho);

  return {
    sucesso: true,
    mensagem: "cadastro realizado com sucesso",
    data: {
      id: novoProduto._id,
      nome: novoProduto.nome,
    },
  };
};

const pesquisaPorFiltros = async (filtros) => {
  const filtroMongo = {};

  if (filtros.categoria) { 
    filtroMongo.categoria = filtros.categoria;
  }

  if (filtros.fornecedor) { 
    filtroMongo.fornecedor = filtros.fornecedor;
  }

  if (filtros.nomelike) {
    filtroMongo.nome = { $regex: ".*" + filtros.nomelike + ".*" };
  }

  const resultadoDB = await produto.find(filtroMongo).collation({'locale':'en'}).sort({"nome":1});

  return resultadoDB.map((item) => {
    return produtoMapper.toItemListaDTO(item);
  });
};

const deleta = async ({ fornecedorId, produtoId, usuarioId }) => {
  const [fornecedorDB, produtoDB] = await Promise.all([
    fornecedor.findById(fornecedorId),
    produto.findById(produtoId),
  ]);

  if (!fornecedorDB) {
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: ["O fornecedor informado não existe."],
    };
  }

  if (fornecedorId !== usuarioId) {
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: ["O produto a ser excluido não pertence ao fornecedor."],
    };
  }

  if (!produtoDB) {
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: ["O produto informado não existe."],
    };
  }

  if (produtoDB.fornecedor.toString() !== fornecedorId) {
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: ["O fornecedor informado e inválido."],
    };
  }

  const categoriaDB = await categoria.findById(produtoDB.categoria);
  categoriaDB.produtos = categoriaDB.produtos.filter((item) => {
    return item.toString() !== produtoId;
  });

  fornecedorDB.produtos = fornecedorDB.produtos.filter((item) => {
    return item.toString() !== produtoId;
  });

  await Promise.all([
    categoriaDB.save(),
    fornecedorDB.save(),
    produto.deleteOne(produtoDB),
  ]);

  const { imagem } = produtoDB;
  fileUtils.remove("produtos", imagem.nome);

  return {
    sucesso: true,
    mensagem: "operação realizada com sucesso",
    data: {
      id: produtoId,
      nome: produtoDB.nome,
    },
  };
};

module.exports = {
  cria,
  pesquisaPorFiltros,
  deleta
};
