const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const db = require('../db/config')
const router = require('./routes/routes.index')

mongoose.connect(
  db.uri,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  (err) => {
    console.log(`Unable to connect to MongoDB server\n${err}`)
  }
)

const app = express()
app.use(cors())
app.use(express.json())
app.use('/static', express.static(`${__dirname}/..` + `/api/utils/file`))

router(app)

module.exports = app
