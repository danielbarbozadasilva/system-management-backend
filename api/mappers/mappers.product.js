const fileUtils = require('../utils/utils.file');

const toItemListaDTO = (model) => {
  const { _id, name, description, preco, provider, category, image, status } =
    model;

  return {
    id: _id,
    name: name,
    description: description,
    preco: String(preco),
    image: fileUtils.criaEnderecoDownload('products', image.name),
    categoryId: category,
    providerId: provider,
  };
};

module.exports = {
  toItemListaDTO,
};
