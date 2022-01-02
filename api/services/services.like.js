const { provider, product, like, client } = require('../models/models.index');
const { toDTOListLikeProviderProduct } = require('../mappers/mappers.client');

const listLikesProviderProductService = async (providerId) => {
  const likeDB = await like
    .find({
      provider: providerId,
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

const createLikeProviderProductService = async (providerId, productId) => {
  const [providerDB, productDB, likeDB, likeProviderDB] = await Promise.all([
    provider.findById(providerId),
    product.findById(productId),
    like.find({ provider: providerId, product: productId }),
    like.find({ provider: providerId }).where('product').ne(null),
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
    provider: providerId,
    product: productId,
  });
  const resultLike = await Promise.all([resp.save()]);
  if (resultLike) {
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

const removeLikeProviderProductService = async (providerId, productId) => {
  const [providerDB, productDB, likeDB] = await Promise.all([
    provider.findById(providerId),
    product.findById(productId),
    like.findOne({ provider: providerId, product: productId }),
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
    const resultLike = await Promise.all([like.deleteOne(likeDB)]);
    if (resultLike) {
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

const listLikesClientProviderService = async (clientId) => {
  const resultLikeDB = await client.aggregate([
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

const createLikeClientProviderService = async (providerId, clientId) => {
  const [providerDB, clientDB, likeDB, likeProviderDB] = await Promise.all([
    provider.findById(Object(providerId)),
    client.findById(clientId),
    like.findOne({ provider: Object(providerId), client: clientId }),
    like.find({ provider: providerId }).where('client').ne(null),
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
    provider: providerId,
    client: clientId,
  });
  const resultLike = await Promise.all([resp.save()]);
  if (resultLike) {
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

const removeLikeClientProviderService = async (providerId, clientId) => {
  const [providerDB, clientDB, likeDB] = await Promise.all([
    provider.findById(providerId),
    client.findById(clientId),
    like.findOne({ provider: Object(providerId), client: clientId }),
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
    const resultLike = await Promise.all([like.deleteOne(likeDB)]);
    if (resultLike) {
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
  listLikesProviderProductService,
  createLikeProviderProductService,
  removeLikeProviderProductService,
  listLikesClientProviderService,
  createLikeClientProviderService,
  removeLikeClientProviderService,
};
