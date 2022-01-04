const fileUtils = require('../utils/utils.file')

const toDTO = (model) => {
  const { _id, name, description, price, provider, category, image } = model
  return {
    id: _id,
    name,
    description,
    price: parseFloat(price).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    image: fileUtils.UtilCreateAddressDownload('product', image.name),
    category,
    provider
  }
}

const toItemListDTO = (model) => {
  const { _id, name, description, price, provider, category, image } = model
  const {
    id,
    cnpj,
    fantasyName,
    socialName,
    address,
    uf,
    city,
    responsible,
    phone,
    status
  } = provider

  return {
    id: _id,
    category,
    name,
    description,
    price: parseFloat(price).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    image: fileUtils.UtilCreateAddressDownload('product', image.name),
    provider: {
      id: _id,
      cnpj,
      fantasyName,
      socialName,
      address,
      uf,
      city,
      responsible,
      phone,
      status
    }
  }
}

module.exports = {
  toItemListDTO,
  toDTO
}
