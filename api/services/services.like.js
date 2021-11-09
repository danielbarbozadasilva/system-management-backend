const { provider, product, client, like } = require('../models/models.index');

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

    await Promise.all([resp.save()]);

    return {
      success: true,
      data: {
        message: 'Successfully liked!',
        id: resp._id,
        provider: resp.provider,
        client: resp.client,
      },
    };
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
    await Promise.all([like.deleteOne()]);

    return {
      success: true,
      data: {
        message: 'Like removed successfully!',
      },
    };
  } else if (!likeDB) {
    return {
      success: false,
      details: 'There is no like!',
    };
  }
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

    await Promise.all([resp.save()]);

    return {
      success: true,
      data: {
        message: 'Successfully liked!',
        id: resp._id,
        provider: resp.provider,
        product: resp.product,
      },
    };
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
    await Promise.all([like.deleteOne()]);
    return {
      success: true,
      data: {
        message: 'like removed successfully!',
      },
    };
  } else if (!likeDB) {
    return {
      success: false,
      details: 'There is no like!',
    };
  }
};

module.exports = {
  ServiceCreateLikeClientProvider,
  ServiceRemoveLikeClientProvider,
  ServiceCreateLikeProviderProduct,
  ServiceRemoveLikeProviderProduct,
};
