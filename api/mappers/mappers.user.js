const VerifyTypeUser = (type) => {
  switch (type) {
    case 'admin':
      return 1

    case 'provider':
      return 2

    case 'client':
      return 3

    default:
      break
  }
};

const toUserDTO = (model) => {
  const { _id, email, kind, name, socialName } = model
  return {
    id: _id,
    email,
    name: name ? name : socialName,
    typeUser: VerifyTypeUser(kind)
  }
}

module.exports = {
  toUserDTO,
  VerifyTypeUser
}
