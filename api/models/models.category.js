const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    original_name: {
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
};
