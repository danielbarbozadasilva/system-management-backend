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

const fileUpload = (destiny) => {
  return async (req, res, next) => {
    return await new Promise(function (resolve, reject) {
      const form = formidable.IncomingForm();
      form.uploadDir = fileUtils.UtilCreateAddress('temp');
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err);
        }
        if (req.method === 'POST') {
          if (!postIsValid(files))
            return reject(new ErrorBusinessRule('"image" is mandatory'));
        }

        req.body = {
          ...fields,
        };

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
        return resolve(
          {
            ...fields,
            files,
          },
          next()
        );
      });
    }).catch(function (e) {
      return res
        .status(e.statusCode)
        .send({ success: false, error: { message: e.message } });
    });
  };
};
module.exports = fileUpload;
