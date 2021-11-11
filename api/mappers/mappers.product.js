const fileUtils = require('../utils/utils.file');

const toItemListaDTO = (model) => {
  const { _id, name, description, price, provider, category, image } = model;
  return {
    id: _id,
    name: name,
    description: description,
    price: String(price),
    image: fileUtils.UtilCreateAddressDownload('products', image.name),
    categoryId: category,
    providerId: provider,
  };
};

module.exports = {
  toItemListaDTO,
};
