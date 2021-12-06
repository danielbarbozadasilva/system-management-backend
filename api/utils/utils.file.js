const path = require('path');
const root_address = process.env.FILE_BASE_PATH;
const moment = require('moment');
const fs = require('fs');
const uuid = require('uuid').v4;

const UtilCreateAddress = (destiny, file_name = '') => {
  return path.join(root_address, destiny, file_name);
};

const UtilCreateAddressDownload = (source, file_name) => {
  return path.join('/static', source, file_name);
};

const UtilCreateName = (type) => {
  const resp = type.split('/')[1];
  return `${uuid()}.${resp}`;
};

const UtilMove = (old_path, new_path) => {
  return fs.renameSync(old_path, new_path);
};

const UtilRemove = (source, file) => {
  const address_file = UtilCreateAddress(source, file);
  if (fs.existsSync(address_file)) {
    fs.unlinkSync(address_file);
    return;
  }
};

module.exports = {
  UtilCreateAddress,
  UtilCreateAddressDownload,
  UtilCreateName,
  UtilMove,
  UtilRemove,
};
