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

  const { id, email, kind, nome, nomeFantasia } = model;

  console.log("nome: ", nome,'f', nomeFantasia);

  return {
    id,
    email,
    nome: nome ? nome : nomeFantasia,
    tipoUsuario: trataTipoUsuario(kind),
  }

}


module.exports = {
  toUserDTO,
}


