const nodeEnvironment = process.env.NODE_ENV || 'development'

if (nodeEnvironment === 'development') {
  require('dotenv').config()
}

require('./api/server')
