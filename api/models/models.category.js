const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = {
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
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
  }
}
