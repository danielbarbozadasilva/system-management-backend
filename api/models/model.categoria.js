const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 module.exports = {
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    required: true,
  },
  imagem: {
    originalname: {
      type: String,
      required: false,
    },
    nome: {
      type: String,
      required: false,
    },
    tipo: {
      type: String,
      required: false,
    },
  },

  produtos: [{
    type: Schema.Types.ObjectId,
    ref: 'produto'
  }]

}
