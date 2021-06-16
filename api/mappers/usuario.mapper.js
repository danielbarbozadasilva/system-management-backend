const trataTipoUsuario = (tipo) => {

  switch (tipo) {
    case "administrador":
      return 1;

    case "fornecedor":
      return 2;

    case "cliente":
      return 3;

    default:
      break;
  }

}

const toUserDTO = (model) => {

  const { _id, email, kind, nome, nomeFantasia } = model;

  return {
    id:_id,
    email,
    nome: nome? nome : nomeFantasia,
    tipoUsuario: trataTipoUsuario(kind),
  }

}


module.exports = {
  toUserDTO,
  trataTipoUsuario
}

