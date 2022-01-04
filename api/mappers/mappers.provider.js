const fileUtils = require('../utils/utils.file')

const toDTO = (model) => {
  const {
    id: _id,
    cnpj,
    fantasyName,
    socialName,
    email,
    address,
    uf,
    city,
    responsible,
    phone,
    status
  } = model

  return {
    id: _id,
    cnpj,
    fantasyName,
    socialName,
    email,
    address,
    uf,
    city,
    responsible,
    phone,
    status
  }
}

const toItemListDTO = (model) => ({
  id: model._id,
  category: model.category,
  name: model.name,
  description: model.description,
  price: parseFloat(model.price).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  image: fileUtils.UtilCreateAddressDownload('product', model.image.name),
  provider: {
    id: model.provider._id,
    cnpj: model.provider.cnpj,
    fantasyName: model.provider.fantasyName,
    socialName: model.provider.socialName,
    email: model.provider.email,
    address: model.provider.address,
    uf: model.provider.uf,
    city: model.provider.city,
    responsible: model.provider.responsible,
    phone: model.provider.phone,
    status: model.provider.status
  }
})

const toDTOListLike = (model) => {
  const { id: _id, provider, product } = model

  return {
    id: _id,
    provider,
    product
  }
}

module.exports = {
  toItemListDTO,
  toDTO,
  toDTOListLike
}
