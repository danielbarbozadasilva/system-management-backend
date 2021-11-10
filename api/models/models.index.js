const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createSchema = (father, model, options = {}) => {
  return new Schema(
    {
      ...father,
      ...model,
    },
    {
      timestamps: true,
      collection: 'users_collection',
      ...options,
    }
  );
};

const user_schema = require('./models.user');
const user = mongoose.model(
  'user',
  createSchema(undefined, user_schema, {
    discriminatorKey: 'kind',
  })
);

const admin_schema = require('./models.admin');
const admin = user.discriminator(
  'admin',
  createSchema(user_schema, admin_schema, {})
);

const provider_schema = require('./models.provider');
const provider = user.discriminator(
  'provider',
  createSchema(user_schema, provider_schema, {})
);

const client_schema = require('./models.client');
const client = user.discriminator(
  'client',
  createSchema(user_schema, client_schema, {})
);

const category_schema = require('./models.category');
const category = mongoose.model(
  'category',
  createSchema(undefined, category_schema, {
    collection: 'category_collection',
    toJSON: {
      virtuals: true,
    },
  })
);

const product_schema = require('./models.product');
const product = mongoose.model(
  'product',
  createSchema(undefined, product_schema, {
    collection: 'product_collection',
    toJSON: {
      virtuals: true,
    },
  })
);

const like_schema = require('./models.like');
const like = mongoose.model(
  'like',
  createSchema(undefined, like_schema, {
    collection: 'like_collection',
    toJSON: {
      virtuals: true,
    },
  })
);

module.exports = {
  category,
  user,
  admin,
  provider,
  product,
  like,
  client,
};
