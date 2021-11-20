const fileUtils = require('../utils/utils.file');

const toDTO = (model) => {
  const {
    id: _id,
    cnpj,
    fantasy_name,
    social_name,
    address,
    uf,
    city,
    responsible,
    phone,
    status,
  } = model;

  return {
    id: _id,
    cnpj,
    fantasy_name,
    social_name,
    address,
    uf,
    city,
    responsible,
    phone,
    status,
  };
};

const toItemListDTO = (model) => {
  const { _id, name, description, price, provider, category, image } = model;
  const {
    cnpj,
    fantasy_name,
    social_name,
    address,
    uf,
    city,
    responsible,
    phone,
    status,
  } = provider;

  return {
    id: _id,
    category,
    name,
    description,
    price: parseFloat(price).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }),
    image: fileUtils.UtilCreateAddressDownload('product', image.name),
    provider: {
      id: provider._id,
      cnpj: cnpj,
      fantasy_name: fantasy_name,
      social_name: social_name,
      address: address,
      uf: uf,
      city: city,
      responsible: responsible,
      phone: phone,
      status: status,
    },
  };
};

module.exports = {
  toItemListDTO,
  toDTO,
};
