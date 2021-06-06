const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = {

  nome: {
    type: String,
    required: true,
  },

  descricao: {
    type: String,
    required: true,
  },

  preco: {
    type: Number,
    required: true,
  },

  imagem: {
    nomeOriginal: {
      type: String,
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
  },

  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'categoria'
  },

  fornecedor: {
    type: Schema.Types.ObjectId,
    ref: 'fornecedor'
  }

}
