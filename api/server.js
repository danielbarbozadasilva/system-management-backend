const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')
const db = require('../db/config')
const { version, name } = require('../package.json')

mongoose.connect(
  db.uri,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  (err) => {
    if (err) {
      console.log('Unable to connect to MongoDB server')
    } else {
      console.log(
        `<<< ${name} v${version} was started in 'DEV' environment on port ${process.env.PORT} >>>`
      )
    }
  }
)

const app = express()
app.use(cors())
app.use(express.json())
app.use('/static', express.static(`${__dirname}/..` + `/api/utils/file`))

const router = require('./routes/routes.index')

router(app)

const port = process.env.PORT ? Number(process.env.PORT) : 3001

app.listen(port, () => {})

module.exports = app
