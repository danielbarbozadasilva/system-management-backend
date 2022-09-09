const toDTO = (model) => {
  const date = new Date()
  return {
    id: model._id,
    firstName: model.firstName,
    lastName: model.lastName,
    name: `${model.firstName} ${model.lastName}`,
    birthDate: date.toLocaleDateString(model.birthDate),
    phone: model.phone,
    uf: model.uf,
    city: model.city,
    status: model.status === 'ENABLE' ? 'Ativo' : 'Desativado',
    email: model.email,
    password: model.password,
    likes: model?.likes?.filter((item) => ({
      id: item
    }))
  }
}

const toDTOListProviderLike = (model) => {
  let count = 0
  return {
    id: model?._id,
    name: `${model?.firstName} ${model?.lastName}`,
    email: model?.email,
    provider: model?.result_likes?.map((item) => {
      count++
      return {
        id: item?._id,
        name: item?.fantasyName,
        email: item?.email
      }
    }),
    count
  }
}

module.exports = {
  toDTO,
  toDTOListProviderLike
}
