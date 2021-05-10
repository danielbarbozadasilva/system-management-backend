const { version, name } = require('./package.json');

const node_environment = process.env.NODE_ENV || 'development'

if (node_environment === 'development') {
  require('dotenv').config();
}

require('./api/server');

console.log(
  `<<< ${name} v${version} was started in 'DEV' environment on port ${process.env.PORT} >>>`
);
