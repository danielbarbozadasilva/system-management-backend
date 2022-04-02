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
  let qtd = 0

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
    result_products: model.result_products.map((item) => {
      return {
        id: item?._id,
        price: item?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        category: item?.category,
        provider: item?.provider,
        name: item?.name,
        description: item?.description,
        image: fileUtils.UtilCreateAddressDownload('category', item.image.name)
      }
    }),

    result_client: model.result_client.map((item) => {
      return {
        id: item?._id,
        name: item?.firstName + ' ' + item?.lastName,
        email: item?.email,
        kind: item?.kind
      }
    }),

    result_likes: model.result_likes.map((item) => {
      if (item?.product) {
        qtd++
        return [{
          id: item?._id,
          product: item?.product,
          provider: item?.provider
        }]
      }
    }).find(item => item !== null),

    result_count: qtd
  }
}

const toDTOListProviderLike = (model) => {
  return {
    id: model._id,
    name: model.result_like.fantasyName,
    email: model.result_like.email,
    provider: model.provider,
    client: model.client
  }
}

module.exports = {
  toItemListDTO,
  toDTO,
  toDTOListProviderLike
}
