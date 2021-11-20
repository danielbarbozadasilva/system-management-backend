const { provider, product, client, like } = require('../models/models.index');

const ServiceSearchLikeClientProvider = async (providerid, clientid) => {
  return;
};
const ServiceCreateLikeClientProvider = async (providerid, clientid) => {
  const [providerDB, clientDB, likeDB] = await Promise.all([
    provider.findById(providerid),
    client.findById(clientid),
    like.findOne({ provider: providerid, client: clientid }),
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
      provider: providerid,
      client: clientid,
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

const ServiceRemoveLikeClientProvider = async (providerid, clientid) => {
  const [providerDB, clientDB, likeDB] = await Promise.all([
    provider.findById(providerid),
    client.findById(clientid),
    like.findOne({ provider: providerid, client: clientid }),
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

const ServiceSearchLikeProviderProduct = async (providerid, productid) => {
  return;
};

const ServiceCreateLikeProviderProduct = async (providerid, productid) => {
  const [providerDB, productDB, likeDB] = await Promise.all([
    provider.findById(providerid),
    product.findById(productid),
    like.findOne({ provider: providerid, product: productid }),
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
      provider: providerid,
      product: productid,
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

const ServiceRemoveLikeProviderProduct = async (providerid, productid) => {
  const [providerDB, productDB, likeDB] = await Promise.all([
    provider.findById(providerid),
    product.findById(productid),
    like.findOne({ provider: providerid, product: productid }),
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
