const { ObjectId } = require('mongodb')
const { provider, product, like, client } = require('../models/models.index')
const { toDTOListProviderLike } = require('../mappers/mappers.provider')

const listLikesProviderProductService = async (providerId) => {
  const likeDB = await like
    .find({
      provider: Object(providerId)
    })
    .where('product')
    .ne(null)
    .populate('product')

  if (likeDB === 0) {
    return {
      success: false,
      details: 'No likes found!'
    }
  }
  if (likeDB !== 0) {
    return {
      success: true,
      message: 'Operation performed successfully!',
      data: toDTOListProviderLike(...likeDB)
    }
  }
}

const createLikeProviderProductService = async (providerId, productId) => {
  const [providerDB, productDB, likeDB, likeProviderDB] = await Promise.all([
    provider.findById(providerId),
    product.findById(productId),
    like.find({ provider: providerId, product: productId }),
    like.find({ provider: providerId }).where('product').ne(null)
  ])

  if (!providerDB) {
    return {
      success: false,
      details: 'The provider informed does not exist!'
    }
  }
  if (!productDB) {
    return {
      success: false,
      details: 'The product informed does not exist!'
    }
  }
  if (likeProviderDB.length >= 3) {
    return {
      success: false,
      details: 'The provider cannot like more than three products!'
    }
  }
  if (likeDB.length > 0) {
    return {
      success: false,
      details: 'The provider has already liked the product!'
    }
  }
  const resp = await like.create({
    provider: providerId,
    product: productId
  })
  const resultLike = await Promise.all([resp.save()])
  if (resultLike) {
    return {
      success: true,
      message: 'Successfully liked!',
      data: {
        id: resp._id,
        provider: resp.provider,
        product: resp.product
      }
    }
  }
  return {
    success: false,
    details: 'There is no like!'
  }
}

const removeLikeProviderProductService = async (providerId, productId) => {
  const [providerDB, productDB, likeDB] = await Promise.all([
    provider.findById(providerId),
    product.findById(productId),
    like.findOne({ provider: providerId, product: productId })
  ])

  if (!providerDB) {
    return {
      success: false,
      details: 'The provider informed does not exist!'
    }
  }
  if (!productDB) {
    return {
      success: false,
      details: 'The product informed does not exist!'
    }
  }
  if (likeDB) {
    const resultLike = await Promise.all([like.deleteOne(likeDB)])
    if (resultLike) {
      return {
        success: true,
        data: {
          message: 'like removed successfully!'
        }
      }
    }
    return {
      success: false,
      details: 'There is no like!'
    }
  }
}

const listLikesClientProviderService = async (clientId) => {
  const resultLikeDB = await client.aggregate([
    { $match: { _id: ObjectId(clientId) } },
    {
      $lookup: {
        from: like.collection.name,
        localField: '_id',
        foreignField: 'client',
        as: 'likes'
      }
    },
    {
      $unwind: {
        path: '$result_like',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $match: {
        'likes.client': {
          $exists: true,
          $ne: null
        }
      }
    }
  ])

  if (resultLikeDB == 0) {
    return {
      success: false,
      details: 'No likes found!'
    }
  }
  if (resultLikeDB !== 0) {
    return {
      success: true,
      message: 'Operation performed successfully!',
      data: resultLikeDB
    }
  }
}

const createLikeClientProviderService = async (providerId, clientId) => {
  const [providerDB, clientDB, likeDB, likeProviderDB] = await Promise.all([
    provider.findById(Object(providerId)),
    client.findById(clientId),
    like.findOne({ provider: Object(providerId), client: clientId }),
    like.find({ provider: providerId }).where('client').ne(null)
  ])

  if (!providerDB) {
    return {
      success: false,
      details: 'The provider informed does not exist!'
    }
  }
  if (!clientDB) {
    return {
      success: false,
      details: 'The client informed does not exist!'
    }
  }
  if (likeProviderDB.length >= 3) {
    return {
      success: false,
      details: 'The client cannot like more than three providers!'
    }
  }
  if (likeDB) {
    return {
      success: false,
      details: 'The client has already liked the provider!'
    }
  }
  const resp = await like.create({
    provider: providerId,
    client: clientId
  })
  const resultLike = await Promise.all([resp.save()])
  if (resultLike) {
    return {
      success: true,
      message: 'Successfully liked!',
      data: {
        id: resp._id,
        provider: resp.provider,
        client: resp.client
      }
    }
  }
  return {
    success: false,
    details: 'There is no like!'
  }
}

const removeLikeClientProviderService = async (providerId, clientId) => {
  const [providerDB, clientDB, likeDB] = await Promise.all([
    provider.findById(providerId),
    client.findById(clientId),
    like.findOne({ provider: Object(providerId), client: clientId })
  ])

  if (!providerDB) {
    return {
      success: false,
      details: 'The provider informed does not exist!'
    }
  }
  if (!clientDB) {
    return {
      success: false,
      details: 'The client informed does not exist!'
    }
  }
  if (likeDB === null) {
    return {
      success: false,
      details: 'like does not exist!'
    }
  }
  if (likeDB !== null) {
    const resultLike = await Promise.all([like.deleteOne(likeDB)])
    if (resultLike) {
      return {
        success: true,
        data: {
          message: 'like removed successfully!'
        }
      }
    }
    return {
      success: false,
      details: 'Error deleting like!'
    }
  }
}

module.exports = {
  listLikesProviderProductService,
  createLikeProviderProductService,
  removeLikeProviderProductService,
  listLikesClientProviderService,
  createLikeClientProviderService,
  removeLikeClientProviderService
}
