const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const db = require('../db/config');
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const app = express();
app.use(cors());
app.use(express.json());

/* O express vai usar qualquer conteúdo estático que 
esteja dentro do diretório que estou apontando */
/* __dirname (/home/pc/Área de Trabalho/projeto04meu/backend/api/server.js)  */
/* ('/..') - Subo um nível, saio do 'server.js' e vou para a 'RAIZ' e aponto para 'ARQUIVOS' */
app.use('/static', express.static(__dirname + '/..' + '/arquivos'));

const router = require('./routes/index');
router(app);

const port = process.env.PORT ? Number(process.env.PORT) : 3001
app.use('/static', express.static(__dirname + '/..' + '/arquivos'));
/* pega as informações e colocar como 'true*, ZERA o MODAL
para que o contador da barra de progresso fique sempre ZERO */

app.listen(port, () => {
});


module.exports = app;


