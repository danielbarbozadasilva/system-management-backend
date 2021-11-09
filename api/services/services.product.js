const { product, category, provider } = require('../models/models.index');
const fileUtils = require('../utils/utils.file');
const productMapper = require('../mappers/mappers.product');

const create = async (model) => {
  const [categoryDB, providerDB] = await Promise.all([
    category.findById(model.category),
    provider.findById(model.providerlogadoid),
  ]);

  if (!providerDB) {
    return {
      success: false,
      message: 'operação não pode ser realizada',
      details: ['Não existe provider cadastrado para o provider id informado'],
    };
  }

  if (!categoryDB) {
    return {
      success: false,
      message: 'operação não pode ser realizada',
      details: ['Não existe category cadastrada para o category id informado'],
    };
  }

  const newproduct = await product.create({
    name: model.name,
    description: model.description,
    preco: model.preco,
    category: model.category,
    provider: model.providerlogadoid,
    image: {
      sourcealName: model.image.sourcealName,
      name: model.image.newame,
      type: model.image.type,
    },
  });

  fileUtils.move(model.image.caminhosourceal, model.image.newCaminho);

  return {
    success: true,
    message: 'Cadastro realizado com success',
    data: {
      id: newproduct._id,
      name: newproduct.name,
    },
  };
};

const SEARCHPorFiltros = async (filtros) => {
  const filtroMongo = {};
  if (filtros.category) {
    filtroMongo.category = filtros.category;
  }

  if (filtros.provider) {
    filtroMongo.provider = filtros.provider;
  }

  if (filtros.namelike) {
    filtroMongo.name = { $regex: '.*' + filtros.namelike + '.*' };
  }

  const resultadoDB = await product
    .find(filtroMongo)
    .populate('product')
    .populate('provider')
    .populate('category');

  return resultadoDB.map((item) => {
    return productMapper.toItemListaDTO(item);
  });
};

const deleta = async ({ providerId, productId, userId }) => {
  const [providerDB, productDB] = await Promise.all([
    provider.findById(providerId),
    product.findById(productId),
  ]);

  if (!providerDB) {
    return {
      success: false,
      message: 'Operação não pode ser realizada',
      details: ['O provider informado não existe.'],
    };
  }

  if (providerId !== userId) {
    return {
      success: false,
      message: 'Operação não pode ser realizada',
      details: ['O product a ser excluido não pertence ao provider.'],
    };
  }

  if (!productDB) {
    return {
      success: false,
      message: 'Operação não pode ser realizada',
      details: ['O product informado não existe.'],
    };
  }

  if (productDB.provider.toString() !== providerId) {
    return {
      success: false,
      message: 'operação não pode ser realizada',
      details: ['O provider informado e inválido.'],
    };
  }

  const categoryDB = await category.findById(productDB.category);
  categoryDB.products = categoryDB.products.filter((item) => {
    return item.toString() !== productId;
  });

  providerDB.products = providerDB.products.filter((item) => {
    return item.toString() !== productId;
  });

  await Promise.all([
    categoryDB.save(),
    providerDB.save(),
    product.deleteOne({ _id: productId }),
  ]);

  const { image } = productDB;
  fileUtils.remove('products', image.name);

  let categoryArray = await category.find({ products: productId });
  await Promise.all(
    categoryArray.map(async (item) => {
      let categoryproduct = item.products;
      var index = categoryproduct.findIndex((item) => item == productId);
      categoryproduct.splice(index, 1);
      await category.updateOne(
        { _id: item._id },
        { products: categoryproduct }
      );
    })
  );

  return {
    success: true,
    message: 'Operação realizada com success',
    data: {
      id: productId,
      name: productDB.name,
    },
  };
};

const SEARCH = async (id) => {
  const productDB = await product.findOne({ _id: id });

  if (productDB) {
    return {
      success: true,
      message: 'operação realizada com success',
      data: productMapper.toItemListaDTO(productDB),
    };
  } else {
    return {
      success: false,
      message: 'não foi possível realizar a operação',
      details: ['"productid" não existe.'],
    };
  }
};

const alteraproduct = async (productId, model) => {
  const productDB = await product.findOne({ _id: productId });

  if (!productDB) {
    return {
      success: false,
      message: 'não foi possível realizar a operação',
      details: ['"productid" não existe.'],
    };
  }

  productDB.name = model.name;
  productDB.description = model.description;
  productDB.status = model.status;
  productDB.preco = model.preco;
  productDB.category = model.category;
  productDB.provider = model.provider;

  if (typeof model.image === 'object') {
    fileUtils.remove('products', productDB.image.name);
    fileUtils.move(model.image.caminhosourceal, model.image.newCaminho);
    productDB.image = {
      sourcealName: model.image.sourcealName,
      name: model.image.newame,
      type: model.image.type,
    };
  }

  await productDB.save();

  return {
    success: true,
    message: 'Operação realizada com success!',
    data: productMapper.toItemListaDTO(productDB),
  };
};

module.exports = {
  create,
  SEARCHPorFiltros,
  deleta,
  alteraproduct,
  SEARCH,
};
