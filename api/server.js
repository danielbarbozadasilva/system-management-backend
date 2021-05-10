const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const db = require('../db/config');
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const app = express();
app.use(cors());
app.use(express.json());

const router = require('./routes/index');
router(app);

const port = process.env.PORT ? Number(process.env.PORT) : 3001

app.listen(port, () => {
});


module.exports = app;


