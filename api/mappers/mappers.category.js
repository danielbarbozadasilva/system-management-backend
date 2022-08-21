const fileUtils = require('../utils/utils.file')

const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  description: model.description,
  image: fileUtils.utilCreateAddressDownload('category', model.image.name)
})

module.exports = {
  toDTO
}
