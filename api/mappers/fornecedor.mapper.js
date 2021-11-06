const fileUtils = require("../utils/file.util");
const { cliente } = require("../models/index");

const toListItemDTO = (model) => {
  const { _id, email, cnpj, nameFantasia, status } = model;

  return {
    id: _id,
    email,
    cnpj,
    nameFantasia,
    status,
  };
};

const toDTOLikeCase = (model) => {
  const { name, ...resto } = model;

  return {
    name: name,
    ...resto,
  };
};

const toDTO = (model) => {
  const {
    _id,
    curtidas,
    senha,
    createdAt,
    updatedAt,
    __v,
    kind,
    produtos,
    ...resto
  } = model;

  return {
    id: _id,
    curtidas: curtidas.map((item) => {
      return {
        id: item._id,
        clienteId: item.cliente._id,
      };
    }),
    produtos: produtos.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        preco: parseFloat(item.preco).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
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
