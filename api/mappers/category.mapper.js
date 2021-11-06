const fileUtils = require("../utils/file.util");

const toDTO = (model) => {
  const { image, _id, name, description, status } = model;

  return {
    image: fileUtils.criaEnderecoDownload("category", image.name),
    id: _id,
    name,
    description,
    status,
  };
};

module.exports = {
  toDTO
};
