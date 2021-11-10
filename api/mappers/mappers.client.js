const toDTO = (model) => {
  const { _id, first_name, last_name, birth_date, uf, city, status } = model;
  return {
    id: _id,
    first_name,
    last_name,
    birth_date,
    uf,
    city,
    status,
  };
};

module.exports = { toDTO };
