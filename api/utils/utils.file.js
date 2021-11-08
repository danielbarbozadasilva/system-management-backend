const path = require('path');
const enderecoRaiz = process.env.FILE_BASE_PATH;
const fs = require('fs');
const uuid = require('uuid').v4;

const criaEndereco = (destino, filesname = '') => {
  return path.join(enderecoRaiz, destino, filesname);
};

const criaEnderecoDownload = (origem, filesname) => {
  return path.join('/static', origem, filesname);
};

const crianame = (type) => {
  const typeTratado = type.split('/')[1];
  return `${uuid()}.${typeTratado}`;
};

const move = (oldPath, newPath) => {
  return fs.renameSync(oldPath, newPath);
};

const remove = (origem, files) => {
  const enderecofiles = criaEndereco(origem, files);

  if (fs.existsSync(enderecofiles)) fs.unlinkSync(enderecofiles);

  return;
};

module.exports = {
  criaEndereco,
  criaEnderecoDownload,
  crianame,
  move,
  remove,
};
