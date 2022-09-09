const fileUtils = require('../utils/utils.file')

const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  description: model.description,
  image: fileUtils.utilCreateAddressDownload('category', model.image.name)
})

const toDTOLikeList = (model) => ({
  id: model._id,
  name: model.name,
  description: model.description,
  price: parseFloat(model.price).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  image: fileUtils.utilCreateAddressDownload('products', model.image.name),
  provider: model.provider[0]._id,
  category: model.category[0].name,
  likes: model.provider.map((item) => {
    for (const i in item.likes) {
      if (JSON.stringify(item.likes[i]) == JSON.stringify(model._id)) {
        return true
      }
    }
    return false
  })[0],
  result_client: model.result_client
})

module.exports = {
  toDTO,
  toDTOLikeList
}
