const { produto, category, fornecedor } = require("../models/index");
const fileUtils = require("../utils/file.util");
const produtoMapper = require("../mappers/produto.mapper");

const cria = async (model) => {
  const [categoryDB, fornecedorDB] = await Promise.all([
    category.findById(model.category),
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

  if (!categoryDB) {
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: ["Não existe category cadastrada para o category id informado"],
    };
  }

  const novoProduto = await produto.create({
    name: model.name,
    description: model.description,
    preco: model.preco,
    category: model.category,
    fornecedor: model.fornecedorlogadoid,
    image: {
      originalName: model.image.originalName,
      name: model.image.novoname,
      type: model.image.type,
    },
  });

  fileUtils.move(model.image.caminhoOriginal, model.image.novoCaminho);

  return {
    sucesso: true,
    mensagem: "Cadastro realizado com sucesso",
    data: {
      id: novoProduto._id,
      name: novoProduto.name,
    },
  };
};

const pesquisaPorFiltros = async (filtros) => {
  const filtroMongo = {};
  if (filtros.category) {
    filtroMongo.category = filtros.category;
  }

  if (filtros.fornecedor) {
    filtroMongo.fornecedor = filtros.fornecedor;
  }

  if (filtros.namelike) {
    filtroMongo.name = { $regex: ".*" + filtros.namelike + ".*" };
  }

  const resultadoDB = await produto
    .find(filtroMongo)
    .populate("produto")
    .populate("fornecedor")
    .populate("category");

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
      mensagem: "Operação não pode ser realizada",
      detalhes: ["O fornecedor informado não existe."],
    };
  }

  if (fornecedorId !== usuarioId) {
    return {
      sucesso: false,
      mensagem: "Operação não pode ser realizada",
      detalhes: ["O produto a ser excluido não pertence ao fornecedor."],
    };
  }

  if (!produtoDB) {
    return {
      sucesso: false,
      mensagem: "Operação não pode ser realizada",
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

  const categoryDB = await category.findById(produtoDB.category);
  categoryDB.produtos = categoryDB.produtos.filter((item) => {
    return item.toString() !== produtoId;
  });

  fornecedorDB.produtos = fornecedorDB.produtos.filter((item) => {
    return item.toString() !== produtoId;
  });

  await Promise.all([
    categoryDB.save(),
    fornecedorDB.save(),
    produto.deleteOne({ _id: produtoId }),
  ]);

  const { image } = produtoDB;
  fileUtils.remove("produtos", image.name);

  let categoryArray = await category.find({ produtos: produtoId });
  await Promise.all(
    categoryArray.map(async (item) => {
      let categoryProduto = item.produtos;
      var index = categoryProduto.findIndex((item) => item == produtoId);
      categoryProduto.splice(index, 1);
      await category.updateOne(
        { _id: item._id },
        { produtos: categoryProduto }
      );
    })
  );

  return {
    sucesso: true,
    mensagem: "Operação realizada com sucesso",
    data: {
      id: produtoId,
      name: produtoDB.name,
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

  if (!produtoDB) {
    return {
      sucesso: false,
      mensagem: "não foi possível realizar a operação",
      detalhes: ['"produtoid" não existe.'],
    };
  }

  produtoDB.name = model.name;
  produtoDB.description = model.description;
  produtoDB.status = model.status;
  produtoDB.preco = model.preco;
  produtoDB.category = model.category;
  produtoDB.fornecedor = model.fornecedor;

  if (typeof model.image === "object") {
    fileUtils.remove("produtos", produtoDB.image.name);
    fileUtils.move(model.image.caminhoOriginal, model.image.novoCaminho);
    produtoDB.image = {
      originalName: model.image.originalName,
      name: model.image.novoname,
      type: model.image.type,
    };
  }

  await produtoDB.save();

  return {
    sucesso: true,
    mensagem: "Operação realizada com sucesso!",
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
