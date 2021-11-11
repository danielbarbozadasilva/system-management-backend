const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const fileUtils = require('../utils.file');

const ErrorBusinessRule = require('../errors/errors.business_rule');

const MiddlewareIsValid = (files) => {
  if (!files.image || files.image.name === '') {
    return false;
  }
  return true;
};

const MiddlewareFileUpload = (destiny, isUpdate = false) => {
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
      if (!MiddlewareIsValid(files))
        throw new ErrorBusinessRule('"image" is mandatory.');
    }

    if (files.image && files.image.name !== '') {
      const new_name = fileUtils.UtilCreateName(files.image.type);
      const new_source = fileUtils.UtilCreateAddress(destiny, new_name);

      req.body.image = {
        type: files.image.type,
        source: files.image.name,
        old_source: files.image.path,
        new_name,
        new_source,
      };
    }

    next();
  };
};

module.exports = MiddlewareFileUpload;
