
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createSchema = (modelPai, model, options = {}) => {

  return new Schema({
    ...modelPai,
    ...model,
  }, {
    timestamps: true,
    collection: 'UsuariosCollection',
    ...options,
  })

}


const usuarioSchema = require('./usuario');
const usuario = mongoose.model('usuario', createSchema(undefined, usuarioSchema, {
  discriminatorKey: 'kind',
}));



module.exports = {
  usuario,
}
