const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clienteSchema = {
  nome: {
    type: String,
    required: true,
  },

  data_nascimento: {
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

  status: {
    type: String,
    required: true,
  }
};

module.exports = clienteSchema;
