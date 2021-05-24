const fornecedorSchema = {

    cnpj: {
      type: String,
      required: true,
    },
    nomeFantasia: {
      type: String,
      required: true,
    },
    responsavel: {
        type: String,
        required: true,
      },
    telefone: {
        type: String,
        required: true,
    },
    endereco: {
      type: String,
      required: true,
    },
    uf: {
      type: String,
      required: true,
    },
    cidade: {
      type: String,
      required: true,
    },
 
    // Analise | Ativo | Inativo
    status: {          
      type: String,
      required: true,
    },
  
  }
  
  
  module.exports = fornecedorSchema;
  