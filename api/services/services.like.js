const { provider, product, like, client } = require('../models/models.index');
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

  if (likeDB == 0) {
    return {
      success: false,
      details: 'No likes found!',
    };
  } else if (likeDB !== 0) {
    return {
      success: true,
      message: 'Operation performed successfully!',
      data: likeDB.map((item) => {
        return toDTOListLikeProviderProduct(item);
      }),
    };
  }
};

const ServiceCreateLikeProviderProduct = async (provider_id, product_id) => {
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
  } else if (likeDB) {
    console.log(likeDB);
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

const ServiceSearchLikeClientProvider = async (clientid) => {
  const resultLikeDB = await like
    .find({ client: clientid })
    .where('provider')
    .ne(null);

  var result = resultLikeDB.map((item) => {
    return item.provider;
  });

  const resultDB = await like
    .find({ client: clientid, provider: Object(...result) })
    .populate('like')
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

const ServiceCreateLikeClientProvider = async (providerid, clientid) => {
  const [providerDB, clientDB, likeDB] = await Promise.all([
    provider.findById(Object(providerid)),
    client.findById(clientid),
    like.findOne({ provider: Object(providerid), client: clientid }),
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
      details: 'The client has already liked the provider!',
    };
  } else if (!likeDB) {
    const resp = await like.create({
      provider: providerid,
      client: clientid,
    });

    const result_like = await Promise.all([resp.save()]);
    if (result_like) {
      return {
        success: true,
        message: 'Successfully liked!',
        data: {
          id: resp._id,
          provider: providerid,
          client: clientid,
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

const ServiceRemoveLikeClientProvider = async (providerid, clientid) => {
  const [providerDB, clientDB, likeDB] = await Promise.all([
    provider.findById(providerid),
    client.findById(clientid),
    like.findOne({ provider: Object(providerid), client: clientid }),
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
  } else if (likeDB === null) {
    return {
      success: false,
      details: 'like does not exist!',
    };
  } else if (likeDB !== null) {
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
        details: 'Error deleting like!',
      };
    }
  }
};

module.exports = {
  ServiceSearchLikeProviderProduct,
  ServiceCreateLikeProviderProduct,
  ServiceRemoveLikeProviderProduct,
  ServiceSearchLikeClientProvider,
  ServiceCreateLikeClientProvider,
  ServiceRemoveLikeClientProvider,
};
