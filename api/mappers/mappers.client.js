const fileUtils = require('../utils/utils.file');

const toDTO = (model) => {
  return {
    id: model._id,
    first_name: model.first_name,
    last_name: model.last_name,
    birth_date: model.birth_date,
    phone: model.phone,
    uf: model.uf,
    city: model.city,
    status: model.status,
    email: model.email,
    password: model.password,
  };
};

const toDTOListLikeProviderProduct = (model) => {
  return {
    id: model._id,
    product: {
      id: model._id,
      name: model.name,
      description: model.description,
      price: parseFloat(model.price).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }),
      image: fileUtils.UtilCreateAddressDownload('product', model.image.name),
      category: {
        id: model.category._id,
        name: model.category.name,
        description: model.category.description,
        status: model.category.status,
        image: fileUtils.UtilCreateAddressDownload(
          'category',
          model.category.image.name
        ),
      },
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
    },
  };
};

const toDTOListLikeClientProvider = (model) => {
  const { _id, client } = model;

  return {
    id: _id,
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
    client: {
      id: client._id,
      first_name: client.first_name,
      last_name: client.last_name,
      birth_date: client.birth_date,
      phone: client.phone,
      uf: client.uf,
      city: client.city,
      status: client.status,
    },
  };
};

module.exports = {
  toDTO,
  toDTOListLikeProviderProduct,
  toDTOListLikeClientProvider,
};
