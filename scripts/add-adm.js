const node_environment = process.env.NODE_ENV || 'development'

if (node_environment === 'development') {
  require('dotenv').config();
}

const db = require('../db/config');

const mongoose = require("mongoose");
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const { administrador } = require('../api/models/index');
const criptografia = require('../api/utils/criptografia.util');

const criaADM = async () => {

  await administrador.create({
    email: 'danielbarboza56hotmail.com',
    nome: 'daniel',
    senha: criptografia.criaHash('daniel'),
    tipo: 1
  });
  
  console.log("Administrador adicionado a Base de Dados")

}


criaADM();