const fileUtils = require('../utils/utils.file');

const toDTO = (model) => {
  const { _id, first_name, last_name, birth_date, phone, uf, city, status } =
    model;
  return {
    id: _id,
    first_name,
    last_name,
    birth_date,
    phone,
    uf,
    city,
    status,
  };
};

const toDTOListLikeProviderProduct = (model) => {
  return {
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
  const { _id, provider, client } = model;

  return {
    id: _id,
    provider: {
      id: provider._id,
      cnpj: provider.cnpj,
      fantasy_name: provider.fantasy_name,
      social_name: provider.social_name,
      address: provider.address,
      uf: provider.uf,
      city: provider.city,
      responsible: provider.responsible,
      phone: provider.phone,
      status: provider.status,
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
