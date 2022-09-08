const { product, provider } = require('../models/models.index')
const fileUtils = require('../utils/utils.file')
const productMapper = require('../mappers/mappers.product')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listProductByIdService = async (productId) => {
  const productDB = await product
    .findById({ _id: productId })
    .populate('provider')

  return {
    success: true,
    message: 'Operation performed successfully',
    data: productMapper.toItemListDTO(productDB)
  }
}

const createProductService = async (body, providerid) => {
  try {
    fileUtils.utilMove(body.image.oldPath, body.image.newPath)

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

    return {
      success: true,
      message: 'operation performed successfully',
      data: productMapper.toItemListDTO(productDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listProductWithFilterService = async (name, filter = '') => {
  try {
    const productDB = await product.aggregate([
      {
        $match: {
          name: {
            $regex: `.*${filter}.*`,
            $options: 'i'
          }
        }
      },
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
        $sort: { [`${name}`]: -1 }
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

    await productDB.save()

    return {
      success: true,
      message: 'Operation performed successfully!',
      data: productMapper.toItemListDTO(productDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const deleteProductService = async (productId) => {
  try {
    const likeDB = await provider.find({ likes: `${productId}` })

    if (likeDB.length !== 0) {
      await provider.updateMany({
        $pull: { likes: `${productId}` }
      })
    }

    await product.deleteOne({ _id: productId })

    return {
      success: true,
      message: 'Operation performed successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listProductByIdService,
  createProductService,
  listProductWithFilterService,
  updateProductService,
  deleteProductService
}
