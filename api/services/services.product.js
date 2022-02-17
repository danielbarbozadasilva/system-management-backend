const { product, category, provider } = require('../models/models.index')
const fileUtils = require('../utils/utils.file')
const productMapper = require('../mappers/mappers.product')

const listAllProductService = async () => {
  const productDB = await product.find({})

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

const listProductWithFilterService = async (name = '', filter) => {
  const efilter = {}

  if (name == 'category') {
    efilter.category = filter
  } else if (name == 'provider') {
    efilter.provider = filter
  } else if (name == 'namelike') {
    efilter.name = { $regex: `.*${filter}.*` }
  }

  const resultDB = await product.find(efilter)
  console.log(efilter)

  if (!resultDB.length) {
    return {
      success: false,
      message: 'no results',
      details: ['no results']
    }
  }
  return {
    success: true,
    message: 'operation performed successfully',
    data: resultDB
  }
}

const updateProductService = async (productId, model) => {
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
  productDB.status = model.status
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

const deleteProductService = async ({ providerId, productId, userId }) => {
  const [providerDB, productDB] = await Promise.all([
    provider.findById(providerId),
    product.findById(productId)
  ])

  if (!providerDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['The provided provider does not exist.']
    }
  }

  if (providerId !== userId) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['The product to be excluded does not belong to the provider.']
    }
  }

  if (!productDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['O product informed does not exist.']
    }
  }

  if (productDB.provider.toString() !== providerId) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['The supplier entered is invalid.']
    }
  }

  const categoryDB = await category.findById(productDB.category)
  categoryDB.products = categoryDB.products.filter(
    (item) => item.toString() !== productId
  )

  providerDB.products = providerDB.products.filter(
    (item) => item.toString() !== productId
  )

  await Promise.all([
    categoryDB.save(),
    providerDB.save(),
    product.deleteOne({ _id: productId })
  ])

  const { image } = productDB
  fileUtils.UtilRemove('products', image.name)

  const categoryArray = await category.find({ products: productId })

  await Promise.all(
    categoryArray.map(async (item) => {
      const categoryProduct = item.products
      const index = categoryProduct.findIndex((item) => item == productId)
      categoryProduct.splice(index, 1)
      await category.updateOne({ _id: item._id }, { products: categoryProduct })
    })
  )

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
