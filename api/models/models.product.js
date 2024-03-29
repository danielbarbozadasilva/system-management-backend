const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = {
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true,
    default: 0
  },
  image: {
    origin: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: 'provider'
  }
}
