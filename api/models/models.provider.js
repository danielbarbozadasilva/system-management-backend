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
    uppercase: true,
    trim: true,
    maxlength: 50,
    minlength: 5,
    required: true,
  },
  social_name: {
    type: String,
    uppercase: true,
    trim: true,
    maxlength: 50,
    minlength: 5,
    required: true,
  },
  address: {
    type: String,
    uppercase: true,
    trim: true,
    maxlength: 50,
    minlength: 5,
    required: true,
  },
  uf: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  responsible: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
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
