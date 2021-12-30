const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
  name: {
    type: String,
    uppercase: true,
    trim: true,
    maxlength: 50,
    minlength: 5,
    required: true,
  },
  description: {
    type: String,
    uppercase: true,
    trim: true,
    maxlength: 50,
    minlength: 5,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    default: 0,
  },
  image: {
    origin: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
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
