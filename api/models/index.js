
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* função que recebe um esquema pai e filho e objeto de opção, retorna uma nova instancia apartir da classe esquema */
const createSchema = (modelPai, model, options = {}) => {



/* cria  aligação com a estrutura que criamos e o banco de dados 
atravérs da ORM 'mongoose' */
/* cria  aligação com a estrutura que criamos e o banco de dados 
atravérs da ORM 'mongoose' */
  return new Schema({
    ...modelPai,
    ...model,
  }, {
    timestamps: true,
    collection: 'UsuariosCollection',
    ...options,
  })

}
// ESQUEMA PAI (EMAIL E SENHA), FILHOS (TODOS OS ESQUEMAS DE USUÁRIOS) HERDAM EMAIL E SENHA

// faz a ligação com o model usuário
const usuarioSchema = require('./model.usuario');

// possibilidade de listar qualquer usuário na coleção de usuario

// O esquema pai é indefinido (undefined). Esquema filho (usuarioSchema) - da categoria
const usuario = mongoose.model('usuario', createSchema(undefined, usuarioSchema, {
  discriminatorKey: 'kind',
}));

// não crio um Schema e sim uma relação através do discriminador. Vai me permitir setar o Schema
// o admin tem email e senha em comum
// o admin tem o nome como sendo algo único dele
const administradorSchema = require('./model.administrador');
const administrador = usuario.discriminator('name', createSchema(usuarioSchema, administradorSchema,{}));


const categoriaSchema = require('./model.categoria');

// O esquema pai é indefinido (undefined). Esquema filho (categoriaSchema) - da categoria
const categoria = mongoose.model('categoria', createSchema(undefined, categoriaSchema, {
  collection: 'CategoriaCollection',
}));


module.exports = {
  categoria,
  usuario,
  administrador,
}
