const { provider, product, client, like } = require('../models/models.index');
const {
  toDTOListLikeClientProvider,
  toDTOListLikeProviderProduct,
} = require('../mappers/mappers.client');

const ServiceSearchLikeClientProvider = async (provider_id, client_id) => {
  const [providerDB, clientDB, likeDB] = await Promise.all([
    provider.findById(provider_id),
    client.findById(client_id),
    like.findOne({ provider: provider_id, client: client_id }),
  ]);

  if (!providerDB) {
    return {
      success: false,
      details: 'The provider informed does not exist!',
    };
  } else if (!clientDB) {
    return {
      success: false,
      details: 'The client informed does not exist!',
    };
  } else if (!likeDB) {
    return {
      success: false,
      details: 'No likes found!',
    };
  } else if (likeDB) {
    return {
      success: true,
      message: 'Operation performed successfully!',
      data: [toDTOListLikeClientProvider(...likeDB)],
    };
  }
};

const ServiceCreateLikeClientProvider = async (provider_id, client_id) => {
  const [providerDB, clientDB, likeDB] = await Promise.all([
    provider.findById(provider_id),
    client.findById(client_id),
    like.findOne({ provider: provider_id, client: client_id }),
  ]);

  if (!providerDB) {
    return {
      success: false,
      details: 'The provider informed does not exist!',
    };
  } else if (!clientDB) {
    return {
      success: false,
      details: 'The client informed does not exist!',
    };
  } else if (likeDB) {
    return {
      success: false,
      details: 'Have you already enjoyed this provider!',
    };
  } else if (!likeDB) {
    const resp = await like.create({
      provider: provider_id,
      client: client_id,
    });

    const result_like = await Promise.all([resp.save()]);

    if (!result_like) {
      return {
        success: true,
        data: {
          message: 'Successfully liked!',
          id: resp._id,
          provider: resp.provider,
          client: resp.client,
        },
      };
    } else {
      return {
        success: false,
        details: 'Error performing like!',
      };
    }
  }
};

const ServiceRemoveLikeClientProvider = async (provider_id, client_id) => {
  const [providerDB, clientDB, likeDB] = await Promise.all([
    provider.findById(provider_id),
    client.findById(client_id),
    like.findOne({ provider: provider_id, client: client_id }),
  ]);

  if (!providerDB) {
    return {
      success: false,
      details: 'The provider informed does not exist!',
    };
  } else if (!clientDB) {
    return {
      success: false,
      details: 'The client informed does not exist!',
    };
  } else if (likeDB) {
    const result_like = await Promise.all([like.deleteOne()]);

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

const ServiceSearchLikeProviderProduct = async (provider_id, product_id) => {
  const [providerDB, productDB, likeDB] = await Promise.all([
    provider.findById(provider_id),
    product.findById(product_id),
    like.find({ provider: provider_id, product: product_id }),
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
  } else if (!likeDB) {
    return {
      success: false,
      details: 'No likes found!',
    };
  } else if (likeDB) {
    return {
      success: true,
      data: [toDTOListLikeProviderProduct(...likeDB)],
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
        data: {
          message: 'Successfully liked!',
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
    const result_like = await Promise.all([like.deleteOne()]);
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
