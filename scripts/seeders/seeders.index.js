const db = require('../../db/config');
require('./seeders.add_category');
require('./seeders.add_client_like_provider');
require('./seeders.add_product');
require('./seeders.add_provider_Like_product');
require('./seeders.add_users');

const mongoose = require('mongoose');
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const node_environment = process.env.NODE_ENV || 'development';
if (node_environment === 'development') {
  require('dotenv').config();
}
