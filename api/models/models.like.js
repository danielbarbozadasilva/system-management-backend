const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
  provider: {
    type: Schema.Types.ObjectId,
    required: false,
    trim: true,
    ref: 'provider',
  },
  client: {
    type: Schema.Types.ObjectId,
    required: false,
    trim: true,
    ref: 'client',
  },
  product: {
    type: Schema.Types.ObjectId,
    required: false,
    trim: true,
    ref: 'product',
  },
};
