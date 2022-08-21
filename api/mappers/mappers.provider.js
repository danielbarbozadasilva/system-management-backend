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
  count_likes_products: model?.result_likes?.length,
  count_likes_clients: model?.result_client?.length,

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

  result_client: model.result_client?.map((item) => ({
    id: item?._id,
    name: `${item?.firstName} ${item?.lastName}`,
    email: item?.email,
    kind: item?.kind
  })),

  result_likes: model.result_likes?.map((item) => ({
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

module.exports = {
  toItemListDTO,
  toDTO
}
