const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

const fileUtils = require('../utils.file');

const postIsValid = (files) => {
  if (!files.image || files.image.name === '') {
    return false;
  }
  return true;
};

const putIsValid = (files) => {
  if (!files.image || files.image.name === '') {
    return false;
  }
  return true;
};

const fileUpload = (destino, isUpdate = false) => {
  return async (req, res, next) => {
    const form = formidable.IncomingForm();
    form.uploadDir = fileUtils.UtilCreateAddress('temp');

    var formfields = await new Promise(function (resolve, reject) {
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err);
        }

        resolve({
          ...fields,
          files,
        });
      });
    });

    const { files, ...fields } = formfields;

    req.body = {
      ...fields,
    };

    if (req.method === 'POST') {
      if (!postIsValid(files))
        throw new ErrorRegraDeNegocio(
          '"image" é de preenchimento obrigatório.'
        );
    }

    if (files.image && files.image.name !== '') {
      const newame = fileUtils.UtilCreatename(files.image.type);
      const newCaminho = fileUtils.UtilCreateAddress(destino, newame);

      req.body.image = {
        type: files.image.type,
        sourceName: files.image.name,
        caminhosourceal: files.image.path,
        newame,
        newCaminho,
      };
    }

    next();
  };
};

module.exports = fileUpload;
