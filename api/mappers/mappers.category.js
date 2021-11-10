const fileUtils = require("../utils/utils.file");

const toDTO = (model) => {
  const { image, _id, name, description, status } = model;
  return {
    image: fileUtils.UtilCreateAddressDownload("category", image.name),
    id: _id,
    name,
    description,
    status,
  };
};

module.exports = {
  toDTO
};
