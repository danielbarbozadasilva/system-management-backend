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
  return {
    id: model._id,
    category: model.category,
    name: model.name,
    description: model.description,
    price: parseFloat(model.price).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }),
    image: fileUtils.UtilCreateAddressDownload('product', model.image.name),
    provider: {
      id: model.provider._id,
      cnpj: model.provider.cnpj,
      fantasy_name: model.provider.fantasy_name,
      social_name: model.provider.social_name,
      address: model.provider.address,
      uf: model.provider.uf,
      city: model.provider.city,
      responsible: model.provider.responsible,
      phone: model.provider.phone,
      status: model.provider.status,
    },
  };
};

const toDTOListLike = (model) => {
  const { id: _id, provider, product } = model;

  return {
    id: _id,
    provider,
    product,
  };
};

module.exports = {
  toItemListDTO,
  toDTO,
  toDTOListLike,
};
