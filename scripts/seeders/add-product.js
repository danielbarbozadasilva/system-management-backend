const { produto } = require("../../api/models/index");
const fileUtils = require("../../api/utils/file.util");

const dataProduct = [
  {
    category: "615a19fd4384691888d27098",
    fornecedor: "615a584a79b274425a6fa7db",
    name: "teste-produto01",
    description: "teste-produto01-description",
    preco: 13.55,
    image: {
      originalName: "boloLimao.jpg",
      name: fileUtils.crianame("image/jpeg"),
      type: "image/jpeg",
    },
  },
  {
    category: "61611e6ff0c5860e72da8757",
    fornecedor: "615a584a79b274425a6fa7db",
    name: "teste-produto02",
    description: "teste-produto02-description",
    preco: 20.95,
    image: {
      originalName: "principal2.jpg",
      name: fileUtils.crianame("image/jpeg"),
      type: "image/jpeg",
    },
  },
];

const createProduct = async () => {
  await produto.create(dataProduct);
};

createProduct();
