const mongoose = require('mongoose')
const db = require('../config')

mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true })

const node_environment = process.env.NODE_ENV || 'development'
if (node_environment === 'development') {
  require('dotenv').config()
}

const category = require('./seeders.add_category')
const product = require('./seeders.add_product')
const users = require('./seeders.add_users')

const removeSeeders = async () => {
  const categoryDB = await category.removeCategory()
  const productDB = await product.removeProduct()
  const usersDB = await users.removeUsers()

  await Promise.all([categoryDB, productDB, usersDB])
    .then((result) => {
      console.log(
        `${JSON.stringify(result)}\n` + `\n` + `--> Successfully remove seeders`
      )
    })
    .catch((e) => {
      console.log(e)
    })
}

const addSeeders = async () => {
  const removeAllDB = await removeSeeders()
  const categoryDB = await category.createCategory()
  const usersDB = await users.createUsers()
  const productDB = await product.createProduct()

  await Promise.all([removeAllDB, categoryDB, usersDB, productDB])
    .then((result) => {
      console.log(
        `${JSON.stringify(result)}\n` +
          `\n` +
          `--> Successfully inserted seeders`
      )
    })
    .catch((e) => {
      console.log(e)
    })
}

addSeeders()
