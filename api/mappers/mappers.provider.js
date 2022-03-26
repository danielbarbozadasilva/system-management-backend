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

const toItemListDTO = (model) => {
  return {
    id: model._id,
    cnpj: model.cnpj,
    fantasyName: model.fantasyName,
    socialName: model.socialName,
    email: model.email,
    address: model.address,
    kind: model.kind,
    uf: model.uf,
    city: model.city,
    responsible: model.responsible,
    phone: model.phone,    
    status: model.status,
    count_likes: Object.keys(model.count[0]).length
  }
}

const toDTOListProviderLike = (model) => {
  return [{
    id: model._id,
    provider: model.provider,
    product: model.product.name
  }]
}

module.exports = {
  toItemListDTO,
  toDTO,
  toDTOListProviderLike
}
