const toListItemDTO = (model) => {
  const { _id, email, name, status, data_nascimento, cidade, uf } = model;
  return {
    id: _id,
    name,
    email,
    status,
    data_nascimento,
    cidade,
    uf,
  };
};

const toDTO = (model) => {
  return {
    ...model,
  };
};

module.exports = { toListItemDTO, toDTO };
