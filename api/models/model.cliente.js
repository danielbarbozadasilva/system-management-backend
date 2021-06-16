const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = {

  nome: {
    type: String,
    required: true,
  },

  nascimento: {
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

  status: {          // Analise | Ativo | Inativo
    type: String,
    required: true,
  },

  curtidas: [{
    type: Schema.Types.ObjectId,
    ref: 'curtida'
  }],

}


module.exports = clienteSchema;
