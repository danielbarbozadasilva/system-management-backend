const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const fileUtils = require('../utils.file');

const ErrorBusinessRule = require('../errors/errors.business_rule');

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

const fileUpload = (destiny, isUpdate = false) => {
  return async (req, res, next) => {
    const form = formidable.IncomingForm();
    form.uploadDir = fileUtils.UtilCreateAddress('temp');

    var form_fields = await new Promise(function (resolve, reject) {
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

    const { files, ...fields } = form_fields;

    req.body = {
      ...fields,
    };

    if (req.method === 'POST') {
      if (!postIsValid(files))
        throw new ErrorBusinessRule('"image" is mandatory');
    }

    if (files.image && files.image.name !== '') {
      const newName = fileUtils.UtilCreateName(files.image.type);
      const new_path = fileUtils.UtilCreateAddress(destiny, newName);

      req.body.image = {
        type: files.image.type,
        origin: files.image.name,
        old_path: files.image.path,
        newName,
        new_path,
      };
    }

    next();
  };
};

module.exports = fileUpload;
