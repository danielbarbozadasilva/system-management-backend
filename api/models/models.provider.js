const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerchema = {
  cnpj: {
    type: String,
    required: true,
  },
  fantasy_name: {
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
  responsavel: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
};

module.exports = providerchema;
