
const toListItemDTO = (model) => {

  const { _id, email, nome, status, data_nascimento, cidade, uf} = model;

  return {
    id: _id,
    nome,
    email,
    status,
    data_nascimento,
    cidade,
    uf
  }
}

const toDTO = (model) => {
  return {
    ...model,
  }
}


module.exports = {toListItemDTO, toDTO}
