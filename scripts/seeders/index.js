const db = require('../../db/config');
require('./add-category');
require('./add-clientLikeProvider');
require('./add-product');
require('./add-providerLikeProduct');
require('./add-users');

const mongoose = require('mongoose');
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const node_environment = process.env.NODE_ENV || 'development';
if (node_environment === 'development') {
  require('dotenv').config();
}
