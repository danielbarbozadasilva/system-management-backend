const { product, category, provider } = require('../models/models.index');
const fileUtils = require('../utils/utils.file');
const productMapper = require('../mappers/mappers.product');

const ServiceCreateProduct = async (model) => {
  const [categoryDB, providerDB, productDB, moveFile] = await Promise.all([
    category.findById(model.category),
    provider.findById(model.providerlogadoid),
    product.create({
      name: model.name,
      description: model.description,
      price: model.price,
      category: model.category,
      provider: model.providerlogadoid,
      image: {
        source: model.image.source,
        name: model.image.newName,
        type: model.image.type,
      },
    }),
    fileUtils.move(model.image.source, model.image.newName),
  ]);

  if (!providerDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['There is no provider registered for the provided id provider'],
    };
  }

  if (!categoryDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['There is no category registered for the category_id entered'],
    };
  }

  if (!productDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['It is not possible to insert the product'],
    };
  }

  if (!moveFile) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['It is not possible to move the product'],
    };
  }

  return {
    success: true,
    message: 'operation performed successfully',
    data: {
      id: productDB._id,
      name: productDB.name,
    },
  };
};

const ServiceSearchProductByFilter = async (filters) => {
  const filter = {};
  if (filters.category) {
    filter.category = filters.category;
  }

  if (filters.provider) {
    filter.provider = filters.provider;
  }

  if (filters.namelike) {
    filter.name = { $regex: '.*' + filters.namelike + '.*' };
  }

  const resultDB = await product
    .find(filter)
    .populate('product')
    .populate('provider')
    .populate('category');
  if (resultDB) {
    return {
      success: true,
      message: 'operation performed successfully',
      data: {
        ...productMapper.toItemListaDTO(resultDB)
      },
    }
  } else {
     return {
       success: false,
       message: 'no results',
       details: ['no results'],
     };
  }
  
};

const ServiceDeleteProduct = async ({ providerId, productId, userId }) => {
  const [providerDB, productDB] = await Promise.all([
    provider.findById(providerId),
    product.findById(productId),
  ]);

  if (!providerDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['The provided provider does not exist.'],
    };
  }

  if (providerId !== userId) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['The product to be excluded does not belong to the provider.'],
    };
  }

  if (!productDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['O product informed does not exist.'],
    };
  }

  if (productDB.provider.toString() !== providerId) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['The supplier entered is invalid.'],
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
    message: 'Operation performed successfully',
    data: {
      id: productId,
      name: productDB.name,
    },
  };
};

const ServiceListProductById = async (id) => {
  const productDB = await product.findOne({ _id: id });

  if (productDB) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: productMapper.toItemListaDTO(productDB),
    };
  } else {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ['The product id does not exist.'],
    };
  }
};

const ServiceUpdateProduct = async (productId, model) => {
  const productDB = await product.findOne({ _id: productId });

  if (!productDB) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ['The product id does not exist.'],
    };
  }

  productDB.name = model.name;
  productDB.description = model.description;
  productDB.status = model.status;
  productDB.price = model.price;
  productDB.category = model.category;
  productDB.provider = model.provider;

  if (typeof model.image === 'object') {
    fileUtils.remove('products', productDB.image.name);
    fileUtils.move(model.image.old_source, model.image.new_source);
    productDB.image = {
      source: model.image.source,
      name: model.image.newName,
      type: model.image.type,
    };
  }

  await productDB.save();

  return {
    success: true,
    message: 'Operation performed successfully!',
    data: productMapper.toItemListaDTO(productDB),
  };
};

module.exports = {
  ServiceCreateProduct,
  ServiceSearchProductByFilter,
  ServiceDeleteProduct,
  ServiceUpdateProduct,
  ServiceListProductById,
};
