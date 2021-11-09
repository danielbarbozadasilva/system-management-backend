const fileUtils = require('../utils/file.util');
const { client } = require('../models/models.index');

const toListItemDTO = (model) => {
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

const toDTO = (model) => {
  const { _id, likes, password, kind, products } = model;

  return {
    id: _id,
    likes: likes.map((item) => {
      return {
        id: item._id,
        clientId: item.client._id,
      };
    }),
    products: products.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        preco: parseFloat(item.preco).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
      };
    }),
    ...resto,
  };
};

module.exports = {
  toListItemDTO,
  toDTOLikeCase,
  toDTO,
};
