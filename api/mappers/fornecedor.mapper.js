const fileUtils = require("../utils/file.util");
const { cliente } = require("../models/index");

const toListItemDTO = (model) => {
  const { _id, email, cnpj, nomeFantasia, status } = model;

  return {
    id: _id,
    email,
    cnpj,
    nomeFantasia,
    status,
  };
};

const toDTOLikeCase = (model) => {
  const { nome, ...resto } = model;

  return {
    nome: nome,
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
        nome: item.nome,
        descricao: item.descricao,
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
