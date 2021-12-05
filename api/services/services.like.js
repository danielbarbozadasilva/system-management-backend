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
  const [providerDB, productDB, likeDB, likeProviderDB] = await Promise.all([
    provider.findById(provider_id),
    product.findById(product_id),
    like.find({ provider: provider_id, product: product_id }),
    like.find({ provider: provider_id }).where('product').ne(null),
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
  } else if (likeProviderDB.length >= 3) {
    return {
      success: false,
      details: 'The provider cannot like more than three products!',
    };
  } else if (likeDB.length > 0) {
    return {
      success: false,
      details: 'The provider has already liked the product!',
    };
  }
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
  const resultLikeDB = await client.aggregate([
    // {
    //   $lookup: {
    //     from: like.collection.name,
    //     localField: 'client',
    //     foreignField: '_id',
    //     as: 'likes2',
    //   },
    // },
    {
      $lookup: {
        from: like.collection.name,
        localField: '_id',
        foreignField: 'client',
        as: 'likes',
      },
    },
  ]);

  if (resultLikeDB == 0) {
    return {
      success: false,
      details: 'No likes found!',
    };
  } else if (resultLikeDB !== 0) {
    return {
      success: true,
      message: 'Operation performed successfully!',
      data: resultLikeDB,
    };
  }
};

const ServiceCreateLikeClientProvider = async (provider_id, client_id) => {
  const [providerDB, clientDB, likeDB, likeProviderDB] = await Promise.all([
    provider.findById(Object(provider_id)),
    client.findById(client_id),
    like.findOne({ provider: Object(provider_id), client: client_id }),
    like.find({ provider: provider_id }).where('client').ne(null),
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
  } else if (likeProviderDB.length >= 3) {
    return {
      success: false,
      details: 'The client cannot like more than three providers!',
    };
  } else if (likeDB.length > 0) {
    return {
      success: false,
      details: 'The client has already liked the provider!',
    };
  }
  const resp = await like.create({
    provider: provider_id,
    client: client_id,
  });
  const result_like = await Promise.all([resp.save()]);
  if (result_like) {
    return {
      success: true,
      message: 'Successfully liked!',
      data: {
        id: resp._id,
        provider: resp.provider,
        client: resp.client,
      },
    };
  } else {
    return {
      success: false,
      details: 'There is no like!',
    };
  }
};

const ServiceRemoveLikeClientProvider = async (provider_id, client_id) => {
  const [providerDB, clientDB, likeDB] = await Promise.all([
    provider.findById(provider_id),
    client.findById(client_id),
    like.findOne({ provider: Object(provider_id), client: client_id }),
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
