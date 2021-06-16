const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = {
  fornecedor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'fornecedor',
  },
  cliente: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'cliente',
  },

}
