const { ObjectId } = require('mongodb')
const { provider, product, like, client } = require('../models/models.index')
const { toDTOListProviderLike } = require('../mappers/mappers.provider')
const { toDTOListClientLike } = require('../mappers/mappers.client')

const listLikesProviderProductService = async (providerId) => {
  const resultDB = await like.aggregate([
    { $match: { provider: ObjectId(providerId) } },
    {
      $lookup: {
        from: product.collection.name,
        localField: 'product',
        foreignField: '_id',
        as: 'result_like'
      }
    },
    {
      $unwind: {
        path: '$result_like',
        preserveNullAndEmptyArrays: true
      }
    }
  ])
  if (resultDB === 0) {
    return {
      success: false,
      details: 'No likes found!'
    }
  }
  if (resultDB !== 0) {
    return {
      success: true,
      message: 'Operation performed successfully!',
      data: resultDB.map((item) => toDTOListClientLike(item))
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
      details: 'O fornecedor informado não existe!'
    }
  }

  if (!productDB) {
    return {
      success: false,
      details: 'O produto informado não existe!'
    }
  }

  if (likeProviderDB.length >= 3) {
    return {
      success: false,
      details: 'O fornecedor não pode curtir mais de 3 produtos!'
    }
  }

  if (likeDB.length > 0) {
    return {
      success: false,
      details: 'O fornecedor já curtiu este produto!'
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
  const resultLikeDB = await like.aggregate([
    { $match: { client: ObjectId(clientId) } },
    {
      $lookup: {
        from: provider.collection.name,
        localField: 'provider',
        foreignField: '_id',
        as: 'result_like'
      }
    },
    {
      $unwind: {
        path: '$result_like',
        preserveNullAndEmptyArrays: true
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
      data: resultLikeDB.map((item) => toDTOListProviderLike(item))
    }
  }
}

const createLikeClientProviderService = async (providerId, clientId) => {
  const [providerDB, clientDB, likeDB, likeProviderDB] = await Promise.all([
    provider.findById(providerId),
    client.findById(clientId),
    like.findOne({ provider: Object(providerId), client: clientId }),
    like.find({ client: Object(clientId) })
  ])

  if (!providerDB) {
    return {
      success: false,
      details: 'O fornecedor informado não existe!'
    }
  }

  if (!clientDB) {
    return {
      success: false,
      details: 'O cliente informado não existe!'
    }
  }

  if (likeProviderDB.length >= 3) {
    return {
      success: false,
      details: 'O cliente não pode curtir mais de três fornecedores!'
    }
  }

  if (likeDB) {
    return {
      success: false,
      details: 'O cliente já curtiu esse fornecedor!'
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
      message: 'Curtido com sucesso!',
      data: {
        id: resp._id,
        provider: resp.provider,
        client: resp.client
      }
    }
  }
  return {
    success: false,
    details: 'Erro ao curtir!'
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
      details: 'O fornecedor informado não existe!'
    }
  }
  if (!clientDB) {
    return {
      success: false,
      details: 'O cliente informado não existe!'
    }
  }
  if (likeDB === null) {
    return {
      success: false,
      details: 'A curtida não existe!'
    }
  }
  if (likeDB !== null) {
    const resultLike = await Promise.all([like.deleteOne(likeDB)])
    if (resultLike) {
      return {
        success: true,
        data: {
          message: 'A curtida foi removida com sucesso!'
        }
      }
    }
    return {
      success: false,
      details: 'Erro ao remover a curtida!'
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
