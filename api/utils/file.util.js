const path = require("path");
const enderecoRaiz = process.env.FILE_BASE_PATH;
const fs = require("fs");
const uuid = require("uuid").v4;

const criaEndereco = (destino, arquivoname = "") => {
  return path.join(enderecoRaiz, destino, arquivoname);
};

const criaEnderecoDownload = (origem, arquivoname) => {
  return path.join("/static", origem, arquivoname);
};

const crianame = (type) => {
  const typeTratado = type.split("/")[1];
  return `${uuid()}.${typeTratado}`;
};

const move = (oldPath, newPath) => {
  return fs.renameSync(oldPath, newPath);
};

const remove = (origem, arquivo) => {
  const enderecoArquivo = criaEndereco(origem, arquivo);

  if (fs.existsSync(enderecoArquivo)) fs.unlinkSync(enderecoArquivo);

  return;
};

module.exports = {
  criaEndereco,
  criaEnderecoDownload,
  crianame,
  move,
  remove,
};
