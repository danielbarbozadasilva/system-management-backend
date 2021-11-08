const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createSchema = (modelPai, model, options = {}) => {
  return new Schema(
    {
      ...modelPai,
      ...model,
    },
    {
      timestamps: true,
      collection: 'UsuariosCollection',
      ...options,
    }
  );
};

const usuarioSchema = require('./models.user');

const usuario = mongoose.model(
  'usuario',
  createSchema(undefined, usuarioSchema, {
    discriminatorKey: 'kind',
  })
);

const adminSchema = require('./models.admin');
const admin = usuario.discriminator(
  'admin',
  createSchema(usuarioSchema, adminSchema, {})
);

const providerchema = require('./models.provider');
const provider = usuario.discriminator(
  'provider',
  createSchema(usuarioSchema, providerchema, {})
);

const clientSchema = require('./models.client');
const client = usuario.discriminator(
  'client',
  createSchema(usuarioSchema, clientSchema, {})
);

const categorySchema = require('./models.category');
const category = mongoose.model(
  'category',
  createSchema(undefined, categorySchema, {
    collection: 'categoryCollection',
    toJSON: {
      virtuals: true,
    },
  })
);

const productSchema = require('./models.product');
const product = mongoose.model(
  'product',
  createSchema(undefined, productSchema, {
    collection: 'productCollection',
    toJSON: {
      virtuals: true,
    },
  })
);

const likeSchema = require('./models.like');
const like = mongoose.model(
  'like',
  createSchema(undefined, likeSchema, {
    collection: 'likeCollection',
    toJSON: {
      virtuals: true,
    },
  })
);

module.exports = {
  category,
  usuario,
  admin,
  provider,
  product,
  like,
  client,
};
