const { produto, categoria, fornecedor } = require("../models/index");
const fileUtils = require("../utils/file.util");
const produtoMapper = require("../mappers/produto.mapper");

const cria = async (model) => {
  const [categoriaDB, fornecedorDB] = await Promise.all([
    categoria.findById(model.categoria),
    fornecedor.findById(model.fornecedorlogadoid),
  ]);

  if (!fornecedorDB) {
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: [
        "Não existe fornecedor cadastrado para o fornecedor id informado",
      ],
    };
  }

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
    categoria: model.categoria,
    fornecedor: model.fornecedorlogadoid,
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


////////////////////////////////////////////////////////////////////////////////
const pesquisaPorFiltros = async (filtros) => {
  const filtroMongo = {};
  console.log(filtros);
  if (filtros.categoria) {
    filtroMongo.categoria = filtros.categoria;
  }

  if (filtros.fornecedor) {
    filtroMongo.fornecedor = filtros.fornecedor;
  }

  if (filtros.nomelike) {
    filtroMongo.nome = { $regex: ".*" + filtros.nomelike + ".*" };
  }

  const resultadoDB = await produto
    .find(filtroMongo)
    .sort({ nome: 1 })
    .populate("categoria");
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

  if (produtoDB.fornecedor?.toString() !== fornecedorId) {
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
    produto.deleteOne({ _id: produtoId }),
  ]);

  const { imagem } = produtoDB;
  fileUtils.remove("produtos", imagem.nome);

  let categoriaArray = await categoria.find({ produtos: produtoId });
  await Promise.all(
    categoriaArray.map(async (item) => {
      let categoriaProduto = item.produtos;
      var index = categoriaProduto.findIndex((item) => item == produtoId);
      categoriaProduto.splice(index, 1);
      await categoria.updateOne(
        { _id: item._id },
        { produtos: categoriaProduto }
      );
    })
  );

  return {
    sucesso: true,
    mensagem: "Operação realizada com sucesso",
    data: {
      id: produtoId,
      nome: produtoDB.nome,
    },
  };
};

const pesquisa = async (id) => {
  const produtoDB = await produto.findOne({ _id: id });

  if (produtoDB) {
    return {
      sucesso: true,
      mensagem: "operação realizada com sucesso",
      data: produtoMapper.toItemListaDTO(produtoDB),
    };
  } else {
    return {
      sucesso: false,
      mensagem: "não foi possível realizar a operação",
      detalhes: ['"produtoid" não existe.'],
    };
  }
};

const alteraProduto = async (produtoId, model) => {
  const produtoDB = await produto.findOne({ _id: produtoId });

  const [categoriaDB] = await Promise.all([
    categoria.findById(model.categoria),
  ]);

  if (!produtoDB) {
    return {
      sucesso: false,
      mensagem: "não foi possível realizar a operação",
      detalhes: ['"produtoid" não existe.'],
    };
  }

  produtoDB.nome = model.nome;
  produtoDB.descricao = model.descricao;
  produtoDB.status = model.status;
  produtoDB.preco = model.preco;
  produtoDB.categoria = model.categoria;
  produtoDB.categoriaName = model.categoriaName;
  produtoDB.fornecedorid = model.fornecedorid;

  if (typeof model.imagem === "object") {
    fileUtils.remove("produtos", produtoDB.imagem.nome);
    fileUtils.move(model.imagem.caminhoOriginal, model.imagem.novoCaminho);
    produtoDB.imagem = {
      nomeOriginal: model.imagem.nomeOriginal,
      nome: model.imagem.novoNome,
      tipo: model.imagem.tipo,
    };
  }

  categoriaDB.produtos = [...categoriaDB.produtos, produtoDB._id];
  await produtoDB.save();
  await categoriaDB.save();
  return {
    sucesso: true,
    mensagem: "operação relaizada com sucesso",
    data: produtoMapper.toItemListaDTO(produtoDB),
  };
};

module.exports = {
  cria,
  pesquisaPorFiltros,
  deleta,
  alteraProduto,
  pesquisa,
};
