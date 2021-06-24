
const toListItemDTO = (model) => {

  const { _id, email, nome, status } = model;

  return {
    id: _id,
    nome,
    email,
    status,
  }

}

const toDTO = (model) => {
  return {
    ...model,
  }
}


module.exports = {
  toListItemDTO,
  toDTO,
}
