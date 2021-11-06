const tratatypeUsuario = (type) => {
  switch (type) {
    case "administrador":
      return 1;

    case "fornecedor":
      return 2;

    case "cliente":
      return 3;

    default:
      break;
  }
};

const toUserDTO = (model) => {
  const { _id, email, kind, name, nameFantasia } = model;

  return {
    id: _id,
    email,
    name: name ? name : nameFantasia,
    typeUsuario: tratatypeUsuario(kind),
  };
};

module.exports = {
  toUserDTO,
  tratatypeUsuario,
};
