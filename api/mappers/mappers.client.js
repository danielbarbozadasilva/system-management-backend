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
  const { _id, provider, product } = model;
  const { category } = product;

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
    category: {
      id: category._id,
      name: category.name,
      description: category.description,
      status: category.status,
      image: fileUtils.UtilCreateAddressDownload(
        'category',
        category.image.name
      ),
    },
    product: {
      id: product._id,
      category: product.category,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }),
      image: fileUtils.UtilCreateAddressDownload('product', product.image.name),
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

module.exports = { toDTO, toDTOListLikeProviderProduct, toDTOListLikeClientProvider };
