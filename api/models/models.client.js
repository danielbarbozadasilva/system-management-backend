const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = {
  name: {
    type: String,
    required: true,
  },

  date: {
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
