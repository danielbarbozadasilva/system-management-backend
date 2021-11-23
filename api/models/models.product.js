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
    sourceFile: {
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
