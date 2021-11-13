const fileUtils = require('../utils/utils.file');

const toDTO = (model) => {
  const { image, _id, name, description, status } = model;
  return {
    id: _id,
    name,
    description,
    status,
    image: fileUtils.UtilCreateAddressDownload('category', image.name),
  };
};

module.exports = {
  toDTO,
};
