
const toListItemDTO = (model) => {

  const { _id, email, cnpj, nomeFantasia, status } = model;

  return {
    id: _id,
    email,
    cnpj,
    nomeFantasia,
    status,
  }

}

const toDTO = (model) => {

  const { _id, senha, createdAt, updatedAt, __v, kind, ...resto } = model;

  return {
    id: _id,
    ...resto,
  }

}


module.exports = {
  toListItemDTO,
  toDTO,
}
