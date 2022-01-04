const mongoose = require('mongoose')

const { Schema } = mongoose

const clientSchema = {
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  uf: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  }
}

module.exports = clientSchema
