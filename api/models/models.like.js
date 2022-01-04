const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = {
  provider: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'provider'
  },
  client: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'client'
  },
  product: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'product'
  }
}
