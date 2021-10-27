const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = {
  fornecedor: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "fornecedor",
  },
  cliente: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "cliente",
  },
  produto: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "produto",
  },
};
