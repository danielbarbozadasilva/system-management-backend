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
      product: {
        id: model.product._id,
        name: model.product.name,
        description: model.product.description,
        price: parseFloat(model.product.price).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
        image: fileUtils.UtilCreateAddressDownload(
          'product',
          model.product.image.name
        ),
      },
      like: {
        like_id: model._id,
      },
    },
  };
};

const toDTOListLikeClientProvider = (model) => {
  const { client, provider } = model;

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
