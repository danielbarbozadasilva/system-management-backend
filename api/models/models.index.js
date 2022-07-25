const mongoose = require('mongoose')

const { Schema } = mongoose

const createSchema = (father, model, options = {}) =>
  new Schema(
    {
      ...father,
      ...model
    },
    {
      timestamps: true,
      collection: 'usersCollection',
      ...options
    }
  )

const userSchema = require('./models.user')

const user = mongoose.model(
  'user',
  createSchema(undefined, userSchema, {
    discriminatorKey: 'kind'
  })
)

const adminSchema = require('./models.admin')

const admin = user.discriminator(
  'admin',
  createSchema(userSchema, adminSchema, {})
)

const providerSchema = require('./models.provider')

const provider = user.discriminator(
  'provider',
  createSchema(userSchema, providerSchema, {})
)

const clientSchema = require('./models.client')

const client = user.discriminator(
  'client',
  createSchema(userSchema, clientSchema, {})
)

const categorySchema = require('./models.category')

const category = mongoose.model(
  'category',
  createSchema(undefined, categorySchema, {
    collection: 'categoryCollection',
    toJSON: {
      virtuals: true
    }
  })
)

const productSchema = require('./models.product')

const product = mongoose.model(
  'product',
  createSchema(undefined, productSchema, {
    collection: 'productCollection',
    toJSON: {
      virtuals: true
    }
  })
)

module.exports = {
  category,
  user,
  admin,
  provider,
  product,
  client
}
