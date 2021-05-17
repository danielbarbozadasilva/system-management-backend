const path = require('path');
const enderecoRaiz = process.env.FILE_BASE_PATH;
const moment = require('moment');
const fs = require('fs');
const uuid = require('uuid').v4;

const criaEndereco = (destino, arquivoNome) => {
  // retorna o endereço do meu arquivo
  return path.join(enderecoRaiz, destino, arquivoNome);
}

const criaNome = (tipo) => {
  const tipoTratado = tipo.split('/')[1];
  return `${uuid()}.${tipoTratado}`;
}

const move = (temporario, definitivo) => {
  return fs.renameSync(temporario, definitivo);
}


  
  module.exports = {
    criaEndereco,
    criaNome,
    move,
    // remove,
  }
  