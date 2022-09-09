const fileUtils = require('../utils/utils.file')

const toDTO = (model) => ({
  id: model._id,
  cnpj: model.cnpj,
  fantasyName: model.fantasyName,
  socialName: model.socialName,
  email: model.email,
  address: model.address,
  uf: model.uf,
  city: model.city,
  responsible: model.responsible,
  phone: model.phone,
  status: model.status
})

const toItemListDTO = (model) => ({
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
  count_products: model?.result_products?.length,
  count_likes_products: model?.likes?.length,
  count_likes_clients: model?.clients?.length,

  result_products: model.result_products?.map((item) => ({
    id: item?._id,
    price: parseFloat(item?.price).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    category: item?.category,
    provider: item?.provider,
    name: item?.name,
    description: item?.description,
    image: fileUtils.utilCreateAddressDownload('product', item.image.name)
  })),

  clients: model.clients?.map((item) => ({
    id: item?._id,
    name: `${item?.firstName} ${item?.lastName}`,
    email: item?.email,
    kind: item?.kind
  })),

  likes: model.likes?.map((item) => ({
    id: item?._id,
    name: item?.name,
    priceProduct: parseFloat(item?.price).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    nameProvider: model.fantasyName,
    email: model.email
  }))
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
  toDTOLikeList,
  toItemListDTO,
  toDTO
}
