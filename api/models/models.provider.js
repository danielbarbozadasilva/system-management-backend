const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const provider_schema = {
  cnpj: {
    type: String,
    required: true,
    trim: true,
  },
  fantasy_name: {
    type: String,
    required: true,
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
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  responsible: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    default: 'DISABLE',
  },
};

module.exports = provider_schema;
