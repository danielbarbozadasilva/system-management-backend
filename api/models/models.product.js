const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    original_name: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: 'provider',
  },
};
