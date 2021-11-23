const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = {
  first_name: {
    type: String,
    uppercase: true,
    trim: true,
    maxlength: 50,
    minlength: 5,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    maxlength: 50,
    minlength: 5,
    required: true,
  },
  birth_date: {
    type: Date,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
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
  status: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
};

module.exports = clientSchema;
