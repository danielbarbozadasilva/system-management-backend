const fileUtils = require('../utils/utils.file')

const toDTO = (model) => ({
  id: model._id,
  firstName: model.first_name,
  lastName: model.last_name,
  birthDate: model.birth_date,
  phone: model.phone,
  uf: model.uf,
  city: model.city,
  status: model.status,
  email: model.email,
  password: model.password
})

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
        'product',
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
      firstName: client.first_name,
      lastName: client.last_name,
      birthDate: client.birth_date,
      phone: client.phone,
      uf: client.uf,
      city: client.city,
      status: client.status
    }
  }
}

module.exports = {
  toDTO,
  toDTOListLikeProviderProduct,
  toDTOListLikeClientProvider
}
