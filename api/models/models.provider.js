const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const provider_schema = {
  cnpj: {
    type: String,
    required: true,
  },
  fantasy_name: {
    type: String,
    required: false,
  },
  social_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  uf: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  responsible: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
};

module.exports = provider_schema;
