var mongoose = require('mongoose');
const db = require('../../db/config');
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const node_environment = process.env.NODE_ENV || 'development';
if (node_environment === 'development') {
  require('dotenv').config();
}
const category = require('./seeders.add_category');
const likes = require('./seeders.add_likes');
const product = require('./seeders.add_product');
const users = require('./seeders.add_users');

const remove_seeders = async () => {
  const categoryDB = await category.removeCategory();
  const likesDB = await likes.removeLike();
  const productDB = await product.removeProduct();
  const usersDB = await users.removeUsers();

  await Promise.all([categoryDB, likesDB, productDB, usersDB])
    .then(function (result) {
      console.log(
        JSON.stringify(result) + '\n' + '\n' + '--> Successfully remove seeders'
      );
    })
    .catch(function (e) {
      console.log(e);
    });
};

const add_seeders = async () => {
  const removeAllDB = await remove_seeders();
  const categoryDB = await category.createCategory();
  const usersDB = await users.createUsers();
  const productDB = await product.createProduct();
  const likesDB = await likes.createLike();

  await Promise.all([removeAllDB, categoryDB, usersDB, productDB, likesDB])
    .then(function (result) {
      console.log(
        JSON.stringify(result) +
          '\n' +
          '\n' +
          '--> Successfully inserted seeders'
      );
    })
    .catch(function (e) {
      console.log(e);
    });
};

add_seeders();
