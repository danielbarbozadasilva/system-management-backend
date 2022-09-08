const { ObjectId } = require('mongodb')
const { category, product, provider } = require('../models/models.index')
const categoryMapper = require('../mappers/mappers.category')
const mapperProduct = require('../mappers/mappers.product')
const fileUtils = require('../utils/utils.file')
const ErrorBusinessRule = require('../utils/errors/errors.business-rule')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const searchAllCategoryService = async () => {
  try {
    const categoryDB = await category.find({}).sort({ description: 1 })
    return {
      success: true,
      message: 'Operation performed successfully',
      data: categoryDB.map((item) => categoryMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const searchCategoryByIdService = async (categoryid) => {
  const categoryDB = await category.find({ _id: Object(categoryid) })
  return {
    success: true,
    message: 'Operation performed successfully',
    data: categoryMapper.toDTO(...categoryDB)
  }
}

const searchCategoryByIdProductService = async (categoryid) => {
  try {
    const categoryDB = await product.aggregate([
      { $match: { category: ObjectId(categoryid) } },
      {
        $lookup: {
          from: provider.collection.name,
          localField: 'provider',
          foreignField: '_id',
          as: 'provider'
        }
      },
      {
        $lookup: {
          from: category.collection.name,
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      }
    ])
    return {
      success: true,
      message: 'Operation performed successfully',
      data: categoryDB.map((item) => mapperProduct.toDTOLikeProductList(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const addCategoryService = async (body) => {
  try {
    const categoryDB = await category.create({
      name: body.name,
      description: body.description,
      image: {
        origin: body.image.origin,
        name: body.image.newName,
        type: body.image.type
      }
    })

    fileUtils.utilMove(body.image.oldPath, body.image.newPath)

    categoryDB.image = {
      origin: body.image.origin,
      name: body.image.newName,
      type: body.image.type
    }

    if (categoryDB) {
      return {
        success: true,
        message: 'Operation performed successfully',
        data: categoryMapper.toDTO(categoryDB)
      }
    }
    return {
      success: false,
      details: 'error when inserting to categories'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const removeCategoryProductsService = async (categoryId) => {
  try {
    const categoryDB = await category.findOne({ _id: categoryId })
    const productDB = await product.find({ category: categoryId })

    const { image } = categoryDB
    fileUtils.utilRemove('category', image.name)

    const deleteCategory = await category.deleteOne(categoryDB)

    if (productDB.length !== 0) {
      await product.deleteMany({ category: categoryId })

      productDB.forEach(async (object) => {
        fileUtils.utilRemove('products', object.image.name)
        await provider.updateMany({
          $pull: { likes: object._id }
        })
      })
    }

    if (!deleteCategory) {
      return {
        success: false,
        details: 'Error deleting category'
      }
    }

    return {
      success: true,
      message: 'Operation performed successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateCategoryService = async (categoryId, body) => {
  try {
    const categoryDB = await category.findOne({ _id: categoryId })
    categoryDB.name = body.name
    categoryDB.description = body.description

    if (typeof body.image === 'object') {
      categoryDB.image = {
        origin: body.image.origin,
        name: body.image.newName,
        type: body.image.type
      }

      fileUtils.utilRemove('category', categoryDB.image.name)
      fileUtils.utilMove(body.image.oldPath, body.image.newPath)
    }

    const updateCategory = await categoryDB.save()

    if (!updateCategory) {
      return {
        success: false,
        details: 'Error updating category'
      }
    }
    return {
      success: true,
      message: 'Operation performed successfully',
      data: categoryMapper.toDTO(updateCategory)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  searchAllCategoryService,
  searchCategoryByIdService,
  searchCategoryByIdProductService,
  addCategoryService,
  removeCategoryProductsService,
  updateCategoryService
}
