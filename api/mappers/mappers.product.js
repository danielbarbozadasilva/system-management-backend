const fileUtils = require('../utils/utils.file')

const toDTO = (model) => {
  return {
    id: model._id,
    name: model.name,
    description: model.description,
    price: parseFloat(model.price).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    image: fileUtils.UtilCreateAddressDownload('products', model.image.name),
    categoryName: model.result_category.map((item) => {
      return item?.name
    }),
    provider: model.provider,
    result_likes: model.result_likes.map((item) => {
      return {
        id: item?._id,
        product: item?.product,
        provider: item?.provider
      }
    })
  }
}

const toItemListDTO = (model) => {
  return {
    id: model._id,
    category: model.category,
    name: model.name,
    description: model.description,
    price: parseFloat(model.price).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    image: fileUtils.UtilCreateAddressDownload('products', model.image.name),
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
  }
}

module.exports = {
  toItemListDTO,
  toDTO
}
