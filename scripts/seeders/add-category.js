const { categoria } = require("../../api/models/index");
const fileUtils = require("../../api/utils/file.util");

const createCategory = async () => {
  await categoria.create({
    nome: "teste-category02",
    descricao: "teste-category02-descricao",
    status: true,
    imagem: {
      nomeOriginal: "boloLimao.jpg",
      nome: fileUtils.criaNome("image/jpeg"),
      tipo: "image/jpeg",
    },
  });
};

createCategory();
