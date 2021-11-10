const fileUtils = require('../utils/utils.email');

const toItemListaDTO = (model) => {
  const { _id, name, description, preco, provider, category, image } = model;
  return {
    id: _id,
    name: name,
    description: description,
    preco: String(preco),
    image: fileUtils.UtilCreateAddressDownload('products', image.name),
    categoryId: category,
    providerId: provider,
  };
};

module.exports = {
  toItemListaDTO,
};
