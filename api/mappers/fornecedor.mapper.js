
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

  const { _id, curtidas, senha, createdAt, updatedAt, __v, kind, produtos, ...resto } = model;

  return {
    id: _id,
    curtidas: curtidas.map(item => {
      return {
        id: item._id,
        clienteId: item.cliente._id,
        clienteNome: item.cliente.nome,
      }
    }),
    ...resto,
  }

}


module.exports = {
  toListItemDTO,
  toDTO,
}
