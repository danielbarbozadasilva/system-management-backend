const fileUtils = require('../utils/utils.file')

const toDTO = (model) => {
  const date = new Date()
  return {
    id: model._id,
    firstName: model.firstName,
    lastName: model.lastName,
    name: `${model.firstName} ${model.lastName}`,
    birthDate: date.toLocaleDateString(model.birthDate),
    phone: model.phone,
    uf: model.uf,
    city: model.city,
    status: model.status === 'ENABLE' ? 'Ativo' : 'Desativado',
    email: model.email,
    password: model.password
  }
}

const toDTOListProviderLike = (model) => {
  let count = 0
  return {
    id: model._id,
    name: `${model.firstName} ${model.lastName}`,
    email: model.email,
    provider: model.result_likes.map((item) => {
      count++
      return {
        id: item._id,
        name: item.fantasyName,
        email: item.email
      }
    }),
    count
  }
}

const toDTOListLikeProviderProduct = (model) => ({
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
    status: model.provider.status,
    product: {
      id: model.product._id,
      name: model.product.name,
      description: model.product.description,
      price: parseFloat(model.product.price).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      }),
      image: fileUtils.UtilCreateAddressDownload(
        'products',
        model.product.image.name
      )
    },
    like: {
      like_id: model._id
    }
  }
})

const toDTOListLikeClientProvider = (model) => {
  const { _id, client, provider } = model

  return {
    id: _id,
    provider: {
      id: provider._id,
      cnpj: provider.cnpj,
      fantasyName: provider.fantasyName,
      socialName: provider.socialName,
      address: provider.address,
      uf: provider.uf,
      city: provider.city,
      responsible: provider.responsible,
      phone: provider.phone,
      status: provider.status
    },
    client: {
      id: client._id,
      firstName: client.firstName,
      lastName: client.lastName,
      birthDate: client.birthDate,
      phone: client.phone,
      uf: client.uf,
      city: client.city,
      status: client.status
    }
  }
}

const toDTOLikeLength = (item) => item.likes.length

module.exports = {
  toDTO,
  toDTOListLikeProviderProduct,
  toDTOListLikeClientProvider,
  toDTOLikeLength,
  toDTOListProviderLike
}
