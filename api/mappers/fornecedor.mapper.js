
const toListItemDTO = (model) => {

    const { _id, cnpj, nomeFantasia, status } = model;
  
    // vai devolver
    return {
      id: _id,
      cnpj,
      nomeFantasia,
      status
    }
  
  }
  
  const toDTO = (model) => {
  
    return {
  
    }
  
  }
  
  
  module.exports = {
    toListItemDTO,
    toDTO,
  }
  