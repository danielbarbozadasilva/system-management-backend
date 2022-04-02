const { product, category, provider, client, like } = require('../models/models.index')
const fileUtils = require('../utils/utils.file')
const productMapper = require('../mappers/mappers.product')

const listAllProductService = async () => {
  const productDB = await product.aggregate([
    {
      $lookup: {
        from: category.collection.name,
        localField: 'category',
        foreignField: '_id',
        as: 'result_category'
      }
    },
    {
      $lookup: {
        from: like.collection.name,
        localField: '_id',
        foreignField: 'product',
        as: 'result_likes'
      }
    },

    {
      $group: {
        _id: '$_id',
        occurances: { $push: { user: '$result_likes.product' } },
        doc: { $first: '$$ROOT' }
      }
    },

    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ count: '$occurances' }, '$doc'] }
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
  const productDB = await product.findById({ _id: productId })
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
  const [providerDB, categoryDB, moveFile, productDB] = await Promise.all([
    provider.findById({ _id: Object(providerid) }),
    category.findById({ _id: Object(body.category) }),
    fileUtils.UtilMove(body.image.old_path, body.image.new_path),
    product.create({
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
  if (!productDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['It is not possible to insert the product']
    }
  }
  if (moveFile !== undefined) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['It is not possible to move the product']
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
}

const listProductWithFilterService = async (name, filter) => {
  let search = ''
  let efilter = { description: 1 }

  if (name == 'like') {
    efilter = { result_likes: -1 }
  } else if (name == 'price') {
    efilter = { price: -1 }
  } else if (name == 'description') {
    efilter = { description: -1 }
  } else if (filter == 'nameFilter') {
    search = name
  }

  const productDB = await product.aggregate([
    { $match: { name: { $regex: `.*${search.replace(' ', '')}.*` } } },
    {
      $lookup: {
        from: like.collection.name,
        localField: '_id',
        foreignField: 'product',
        as: 'result_likes'
      }
    },
    {
      $group: {
        _id: '$_id',
        occurances: { $push: { user: '$result_likes.product' } },
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
}

const updateProductService = async (productId, providerid, model) => {
  const productDB = await product.findOne({ _id: productId })
  if (!productDB) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ['The product id does not exist.']
    }
  }

  productDB.name = model.name
  productDB.description = model.description
  productDB.price = model.price
  productDB.category = model.category
  productDB.provider = model.provider

  if (typeof model.image === 'object') {
    productDB.image = {
      origin: model.image.origin,
      name: model.image.newName,
      type: model.image.type
    }

    fileUtils.UtilRemove('products', productDB.image.name)
    fileUtils.UtilMove(model.image.old_path, model.image.new_path)

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
  }
}

const deleteProductService = async ({ productId }) => {
  const productDB = await product.findById(productId)
  if (!productDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['O product informed does not exist.']
    }
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
}

module.exports = {
  listAllProductService,
  listProductByIdService,
  createProductService,
  listProductWithFilterService,
  updateProductService,
  deleteProductService
}
