const toDTO = (model) => {
  const { _id, first_name, last_name, birth_date, phone, uf, city, status } = model;
  return {
    id: _id,
    first_name,
    last_name,birth_date
    birth_date,
    phone,
    uf,
    city,
    status,
  };
};

module.exports = { toDTO };
