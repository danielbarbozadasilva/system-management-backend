const fileUtils = require("../utils/file.util");

const toItemListaDTO = (model) => {
  const { _id, name, description, preco, fornecedor, category, image, status } =
    model;

  return {
    id: _id,
    name: name,
    description: description,
    preco: String(preco),
    image: fileUtils.criaEnderecoDownload("produtos", image.name),
    categoryId: category,
    fornecedorId: fornecedor,
  };
};

module.exports = {
  toItemListaDTO,
};
