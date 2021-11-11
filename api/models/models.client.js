const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = {
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  birth_date: {
    type: Date,
    required: true,
  },
  phone: {
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
  status: {
    type: String,
    required: true,
  },
};

module.exports = clientSchema;
