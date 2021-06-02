const trataTipoUsuario = (tipo) => {

  switch (tipo) {
    case "administrador":
      return 1;

    case "fornecedor":
      return 2;

    case "usuario":
      return 3;
      
    default:
      break;
  }

}


const toUserDTO = (model) => {

  const { id, email, kind, nome, nomeFantasia } = model;

  return {
    id,
    email,
    nome: nome ? nome : nomeFantasia,
    tipoUsuario: 1,
  }

}


module.exports = {
  toUserDTO,
}
