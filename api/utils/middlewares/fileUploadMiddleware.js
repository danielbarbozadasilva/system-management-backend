const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const fileUtils = require('../file.util');

const ErrorRegraDeNegocio = require('../errors/erro-regra-negocio');

const postIsValid = (files) => {

  if ((!files.imagem || files.imagem.name === '')) {
    return false
  }

  return true;

}

const putIsValid = (files) => {

  if ((!files.imagem || files.imagem.name === '')) {
    return false
  }

  return true;

}

const fileUpload = (destino, isUpdate = false) => {

  return async (req, res, next) => {

    const form = formidable.IncomingForm();
    form.uploadDir = fileUtils.criaEndereco('temp');

    var formfields = await new Promise(function (resolve, reject) {
      form.parse(req, (err, fields, files) => {

        if (err) {
          return reject(err);
        }

        resolve({
          ...fields,
          files
        });

      })
    });


    const { files, ...fields } = formfields;

    req.body = {
      ...fields,
    }

    if (req.method === "POST") {

      if (!postIsValid(files))
        throw new ErrorRegraDeNegocio('"imagem" é de preenchimento obrigatório.');

    }

    if (files.imagem && files.imagem.name !== '') {

      const novoNome = fileUtils.criaNome(files.imagem.type);
      const novoCaminho = fileUtils.criaEndereco(destino, novoNome);

      req.body.imagem = {
        tipo: files.imagem.type,
        nomeOriginal: files.imagem.nomeOriginal,
        caminhoOriginal: files.imagem.path,
        novoNome,
        novoCaminho,
      };
    }

    next();

  }

}


module.exports = fileUpload;
