const fileUtils = require('../utils/utils.file')

const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  description: model.description,
  price: parseFloat(model.price).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  image: fileUtils.utilCreateAddressDownload('products', model.image.name),
  category: model.category,
  provider: model.provider,
  likes: model.count[0] === 1
})

const toItemListDTO = (model) => ({
  id: model._id,
  category: model.category,
  name: model.name,
  description: model.description,
  price: parseFloat(model.price).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  image: fileUtils.utilCreateAddressDownload('products', model.image.name),
  provider: {
    id: model.provider._id,
    cnpj: model.provider.cnpj,
    fantasyName: model.provider.fantasyName,
    socialName: model.provider.socialName,
    address: model.provider.address,
    uf: model.provider.uf,
    city: model.provider.city,
    responsible: model.provider.responsible,
    phone: model.provider.phone,
    status: model.provider.status
  }
})

module.exports = {
  toItemListDTO,
  toDTO
}
