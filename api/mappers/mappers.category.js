const fileUtils = require('../utils/utils.file')

const toDTO = (model) => {
  return {
    id: model._id,
    name: model.name,
    description: model.description,
    image: fileUtils.UtilCreateAddressDownload('category', model.image.name)
  }
}

const toDTOCategoryProduct = (model) => {
  return {
    id: model._id,
    name: model.name,
    description: model.description,
    image: fileUtils.UtilCreateAddressDownload('products', model.image.name),
    category: model.category.id
    
  }
}
module.exports = {
  toDTO,
  toDTOCategoryProduct
}
