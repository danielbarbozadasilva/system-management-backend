const { product, category, provider } = require('../models/models.index')
const fileUtils = require('../utils/utils.file')
const productMapper = require('../mappers/mappers.product')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllProductService = async () => {
  const productDB = await product.aggregate([
    {
      $lookup: {
        from: provider.collection.name,
        localField: 'provider',
        foreignField: '_id',
        as: 'provider'
      }
    }
  ])

  if (!productDB.length) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ['The product id does not exist.']
    }
  }
  return {
    success: true,
    message: 'Operation performed successfully',
    data: productDB.map((item) => productMapper.toDTO(item))
  }
}

const listProductByIdService = async (productId) => {
  const productDB = await product
    .findById({ _id: productId })
    .populate('provider')
  if (!productDB) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ['The product id does not exist.']
    }
  }
  return {
    success: true,
    message: 'Operation performed successfully',
    data: productMapper.toItemListDTO(productDB)
  }
}

const createProductService = async (body, providerid) => {
  const [providerDB, categoryDB] = await Promise.all([
    provider.findById({ _id: Object(providerid) }),
    category.findById({ _id: Object(body.category) })
  ])

  if (!providerDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['There is no provider registered for the provided id provider']
    }
  }

  if (!categoryDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['There is no category registered for the category id entered']
    }
  }

  const moveFile = fileUtils.utilMove(body.image.oldPath, body.image.newPath)
  if (moveFile !== undefined) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['It is not possible to move the product']
    }
  }
  try {
    const productDB = await product.create({
      name: body.name,
      description: body.description,
      price: body.price,
      category: body.category,
      provider: providerid,
      image: {
        origin: body.image.origin,
        name: body.image.newName,
        type: body.image.type
      }
    })
    if (!productDB) {
      return {
        success: false,
        message: 'Operation cannot be performed',
        details: ['It is not possible to insert the product']
      }
    }

    return {
      success: true,
      message: 'operation performed successfully',
      data: {
        id: productDB._id,
        name: productDB.name
      }
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listProductWithFilterService = async (name, filter) => {
  try {
    let search = ''
    let efilter = { description: 1 }

    if (name == 'like') {
      efilter = { count: -1 }
    } else if (name == 'price') {
      efilter = { price: -1 }
    } else if (name == 'description') {
      efilter = { description: -1 }
    } else if (filter == 'nameFilter') {
      search = name.trim()
    }

    const productDB = await product.aggregate([
      { $match: { name: { $regex: `.*${search}.*`, $options: 'i' } } },
      {
        $lookup: {
          from: provider.collection.name,
          localField: '_id',
          foreignField: 'likes',
          as: 'likes'
        }
      },
      {
        $group: {
          _id: '$_id',
          occurances: { $push: { $size: '$likes._id' } },
          doc: { $first: '$$ROOT' }
        }
      },

      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ count: '$occurances' }, '$doc'] }
        }
      },
      {
        $sort: efilter
      }
    ])

    return {
      success: true,
      message: 'operation performed successfully',
      data: productDB.map((item) => productMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateProductService = async (providerId, productId, body) => {
  const productDB = await product.findOne({
    _id: `${productId}`,
    provider: `${providerId}`
  })
  if (!productDB) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ['The id does not exist.']
    }
  }
  try {
    productDB.name = body.name
    productDB.description = body.description
    productDB.price = body.price
    productDB.category = body.category
    productDB.provider = body.provider

    if (typeof body.image === 'object') {
      productDB.image = {
        origin: body.image.origin,
        name: body.image.newName,
        type: body.image.type
      }

      fileUtils.utilRemove('products', productDB.image.name)
      fileUtils.utilMove(body.image.oldPath, body.image.newPath)
    }
    const result = await productDB.save()
    if (!result) {
      return {
        success: false,
        message: 'could not perform the operation',
        details: ['The product id does not exist.']
      }
    }
    return {
      success: true,
      message: 'Operation performed successfully!',
      data: productMapper.toItemListDTO(productDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const deleteProductService = async (providerId, productId) => {
  const productDB = await product.findOne({
    _id: `${productId}`,
    provider: `${providerId}`
  })
  if (!productDB) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ['The id does not exist.']
    }
  }

  const likeDB = provider.find({ likes: `${productId}` })

  try {
    if (likeDB.length !== 0) {
      await provider.updateMany({
        $pull: { likes: `${productId}` }
      })
    }

    const resultDB = await product.deleteOne({ _id: productId })
    if (!resultDB) {
      return {
        success: false,
        message: 'Operation cannot be performed',
        details: ['Error deleting data']
      }
    }
    return {
      success: true,
      message: 'Operation performed successfully',
      data: {
        id: productId,
        name: productDB.name
      }
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllProductService,
  listProductByIdService,
  createProductService,
  listProductWithFilterService,
  updateProductService,
  deleteProductService
}
