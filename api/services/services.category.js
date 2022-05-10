const { category, product } = require('../models/models.index')
const categoryMapper = require('../mappers/mappers.category')
const fileUtils = require('../utils/utils.file')
const ErrorBusinessRule = require('../utils/errors/errors.business_rule')

const searchAllCategoryService = async () => {
  const categoryDB = await category.find({}).sort({ description: 1 })
  if (categoryDB.length > 0) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: categoryDB.map((item) => categoryMapper.toDTO(item))
    }
  }
  throw new ErrorBusinessRule('No categories found')
}

const searchCategoryByIdService = async (categoryid) => {
  const categoryDB = await product.find({
    category: Object(categoryid)
  }).populate("category")

  if (categoryDB.length > 0) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: categoryDB.map((item) => categoryMapper.toDTOCategoryProduct(item))
    }
  }
  throw new ErrorBusinessRule('No categories found')
}

const addCategoryService = async (body) => {
  const categoryDB = await category.create({
    name: body.name,
    description: body.description,
    image: {
      origin: body.image.origin,
      name: body.image.newName,
      type: body.image.type
    }
  })

  fileUtils.UtilMove(body.image.old_path, body.image.new_path)

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
    message: 'error when inserting to categories'
  }
}

const removeCategoryProductsService = async (categoryId) => {
  const categoryDB = await category.findOne({ _id: categoryId })

  if (!categoryDB) {
    throw new ErrorBusinessRule("category_id doesn't exist.")
  }

  const { image } = categoryDB

  fileUtils.UtilRemove('category', image.name)

  const deleteCategory = await category.deleteOne(categoryDB)
  if (deleteCategory) {
    return {
      success: true,
      message: 'Operation performed successfully'
    }
  }
  return {
    success: false,
    details: 'Error deleting category'
  }
}

const updateCategoryService = async (categoryId, body) => {
  const categoryDB = await category.findOne({ _id: categoryId })
  if (!categoryDB) {
    throw new ErrorBusinessRule("category_id doesn't exist.")
  }

  categoryDB.name = body.name
  categoryDB.description = body.description

  if (typeof body.image === 'object') {
    categoryDB.image = {
      origin: body.image.origin,
      name: body.image.newName,
      type: body.image.type
    }

    fileUtils.UtilRemove('category', categoryDB.image.name)
    fileUtils.UtilMove(body.image.old_path, body.image.new_path)
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
}

module.exports = {
  searchAllCategoryService,
  searchCategoryByIdService,
  addCategoryService,
  removeCategoryProductsService,
  updateCategoryService
}
