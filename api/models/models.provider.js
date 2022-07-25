const mongoose = require('mongoose')

const { Schema } = mongoose

const providerSchema = {
  cnpj: {
    type: String,
    required: true,
    trim: true
  },
  fantasyName: {
    type: String,
    required: true
  },
  socialName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  uf: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  responsible: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    default: 'DISABLE'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'product'
  }]
}

module.exports = providerSchema
