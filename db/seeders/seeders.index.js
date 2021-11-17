const { JSONParser } = require('formidable');
const mongoose = require('mongoose');
const db = require('../../db/config');
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const node_environment = process.env.NODE_ENV || 'development';
if (node_environment === 'development') {
  require('dotenv').config();
}

const category = require('./seeders.add_category');
const client_provider = require('./seeders.add_client_like_provider');
const product = require('./seeders.add_product');
const like_product = require('./seeders.add_provider_Like_product');
const users = require('./seeders.add_users');

const add_seeders = async (req, res, next) => {
  const categoryDB = await category.createCategory();
  const clientProviderDB = await client_provider.createLike();
  const productDB = await product.createProduct();
  const likeProductDB = await like_product.createLike();
  const usersDB = await users.createUsers();

  await Promise.all([
    categoryDB,
    clientProviderDB,
    productDB,
    likeProductDB,
    usersDB,
  ])
    .then(function (result) {
      console.log(
        JSON.stringify(result) + '\n'+'\n' + '--> Successfully inserted seeders'
      );
    })
    .catch(function (e) {
      console.log(e);
    });
};

add_seeders();
