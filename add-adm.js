
const node_environment = process.env.NODE_ENV || 'development'

if (node_environment === 'development') {
  require('dotenv').config();
}

const db = require('./db/config');

const mongoose = require("mongoose");
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const { administrador } = require('./api/models/index');
const criptografia = require('./api/utils/criptografia.utils');


const criaADM = async () => {

  await administrador.create({
    email: 'ezer.adm@teste.com',
    nome: 'ezer adm',
    senha: criptografia.criaHash('123456')
  });

}


criaADM();