const fileUtils = require('../utils/utils.file');

const toDTO = (model) => {
  const { image, _id, name, description, status } = model;
  return {
    image: fileUtils.UtilCreateaddressDownload('category', image.name),
    id: _id,
    name,
    description,
    status,
  };
};

module.exports = {
  toDTO,
};
