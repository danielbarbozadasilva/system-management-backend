require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

module.exports = {
  uri: `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}`
}
