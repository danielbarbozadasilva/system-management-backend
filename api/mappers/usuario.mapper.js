const trataTipoUsuario = (tipo) => {

    switch (tipo) {
      case "administrador":
        return 1;
  
      default:
        break;
    }
  
  }
  
  
  const toUserDTO = (model) => {
  
    const { id, email, kind, nome, nomeFantasia } = model;
  
    // pega o nome do usuário, empresa ou nomefantasia  
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
  
  
  