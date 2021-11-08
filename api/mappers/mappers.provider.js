const fileUtils = require('../utils/file.util');
const { client } = require('../models/models.index');

const toListItemDTO = (model) => {
  const { _id, email, cnpj, fantasy_name, status } = model;

  return {
    id: _id,
    email,
    cnpj,
    fantasy_name,
    status,
  };
};

const toDTOLikeCase = (model) => {
  const { name, ...rest } = model;

  return {
    name: name,
    ...rest,
  };
};

const toDTO = (model) => {
  const {
    _id,
    likes,
    senha,
    createdAt,
    updatedAt,
    __v,
    kind,
    products,
    ...rest
  } = model;

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
    ...rest,
  };
};

module.exports = {
  toListItemDTO,
  toDTOLikeCase,
  toDTO,
};
