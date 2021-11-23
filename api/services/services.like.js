const { provider, product, client, like } = require('../models/models.index');
const {
  toDTOListLikeClientProvider,
  toDTOListLikeProviderProduct,
} = require('../mappers/mappers.client');

const ServiceSearchLikeProviderProduct = async (provider_id) => {
  const likeDB = await like
    .find({
      provider: provider_id,
    })
    .where('product')
    .ne(null)
    .populate('product')
    .populate('provider');

  const resultDB = await product
    .find({ provider: provider_id, product: likeDB.product })
    .populate('product')
    .populate('category')
    .populate('provider');
  if (resultDB == 0) {
    return {
      success: false,
      details: 'No likes found!',
    };
  } else if (resultDB !== 0) {
    return {
      success: true,
      message: 'Operation performed successfully!',
      data: resultDB.map((item) => {
        return toDTOListLikeProviderProduct(item);
      }),
    };
  }
};

const ServiceCreateLikeProviderProduct = async (provider_id, product_id) => {
  const [providerDB, productDB, likeDB] = await Promise.all([
    provider.findById(provider_id),
    product.findById(product_id),
    like.findOne({ provider: provider_id, product: product_id }),
  ]);

  if (!providerDB) {
    return {
      success: false,
      details: 'The provider informed does not exist!',
    };
  } else if (!productDB) {
    return {
      success: false,
      details: 'The product informed does not exist!',
    };
  } else if (likeDB) {
    return {
      success: false,
      details: 'The provider has already liked the product!',
    };
  } else if (!likeDB) {
    const resp = await like.create({
      provider: provider_id,
      product: product_id,
    });

    const result_like = await Promise.all([resp.save()]);
    if (result_like) {
      return {
        success: true,
        message: 'Successfully liked!',
        data: {
          id: resp._id,
          provider: resp.provider,
          product: resp.product,
        },
      };
    } else {
      return {
        success: false,
        details: 'There is no like!',
      };
    }
  }
};

const ServiceRemoveLikeProviderProduct = async (provider_id, product_id) => {
  const [providerDB, productDB, likeDB] = await Promise.all([
    provider.findById(provider_id),
    product.findById(product_id),
    like.findOne({ provider: provider_id, product: product_id }),
  ]);

  if (!providerDB) {
    return {
      success: false,
      details: 'The provider informed does not exist!',
    };
  } else if (!productDB) {
    return {
      success: false,
      details: 'The product informed does not exist!',
    };
  } else if (likeDB) {
    const result_like = await Promise.all([like.deleteOne(likeDB)]);
    if (result_like) {
      return {
        success: true,
        data: {
          message: 'like removed successfully!',
        },
      };
    } else {
      return {
        success: false,
        details: 'There is no like!',
      };
    }
  }
};

const ServiceSearchLikeClientProvider = async (client_id) => {
  const resultLikeDB = await like
    .find({
      client: client_id,
    })
    .where('client')
    .ne(null)
    .populate('provider');

  const resultDB = await like
    .find({ provider: resultLikeDB.provider, client: client_id })
    .populate('provider')
    .populate('client');
  if (resultDB == 0) {
    return {
      success: false,
      details: 'No likes found!',
    };
  } else if (resultDB !== 0) {
    return {
      success: true,
      message: 'Operation performed successfully!',
      data: resultDB.map((item) => {
        return toDTOListLikeClientProvider(item);
      }),
    };
  }
};

const ServiceCreateLikeClientProvider = async (provider_id, product_id) => {
  const [providerDB, productDB, likeDB] = await Promise.all([
    provider.findById(provider_id),
    product.findById(product_id),
    like.findOne({ provider: provider_id, product: product_id }),
  ]);

  if (!providerDB) {
    return {
      success: false,
      details: 'The provider informed does not exist!',
    };
  } else if (!productDB) {
    return {
      success: false,
      details: 'The product informed does not exist!',
    };
  } else if (likeDB) {
    return {
      success: false,
      details: 'The provider has already liked the product!',
    };
  } else if (!likeDB) {
    const resp = await like.create({
      provider: provider_id,
      product: product_id,
    });

    const result_like = await Promise.all([resp.save()]);
    if (result_like) {
      return {
        success: true,
        message: 'Successfully liked!',
        data: {
          id: resp._id,
          provider: resp.provider,
          product: resp.product,
        },
      };
    } else {
      return {
        success: false,
        details: 'There is no like!',
      };
    }
  }
};

const ServiceRemoveLikeClientProvider = async (provider_id, product_id) => {
  const [providerDB, productDB, likeDB] = await Promise.all([
    provider.findById(provider_id),
    product.findById(product_id),
    like.findOne({ provider: provider_id, product: product_id }),
  ]);

  if (!providerDB) {
    return {
      success: false,
      details: 'The provider informed does not exist!',
    };
  } else if (!productDB) {
    return {
      success: false,
      details: 'The product informed does not exist!',
    };
  } else if (likeDB) {
    const result_like = await Promise.all([like.deleteOne(likeDB)]);
    if (result_like) {
      return {
        success: true,
        data: {
          message: 'like removed successfully!',
        },
      };
    } else {
      return {
        success: false,
        details: 'There is no like!',
      };
    }
  }
};

module.exports = {
  ServiceSearchLikeClientProvider,
  ServiceCreateLikeClientProvider,
  ServiceRemoveLikeClientProvider,
  ServiceSearchLikeProviderProduct,
  ServiceCreateLikeProviderProduct,
  ServiceRemoveLikeProviderProduct,
};
