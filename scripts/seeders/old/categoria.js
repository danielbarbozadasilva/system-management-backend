const { categoria } = require("../api/models/index");

const dataCategoria = [
  {
    _id: "610b77fa39d540005757921e",
    produtos: ["610b7eb0d335af049c8d6d47", "610b7ee0d335af049c8d6d48"],
    nome: "teste-categoria01",
    descricao: "teste-categoria01-descricao",
    status: true,
    imagem: {
      nomeOriginal: "boloLimao.jpg",
      nome: "001cbd16-2828-449b-a1e8-570eb84619e3.jpeg",
      tipo: "image/jpeg",
    },
  },
  {
    _id: "610b7be269808502cef9225c",
    produtos: ["610b7f08d335af049c8d6d49"],
    nome: "teste-categoria02",
    descricao: "teste-categoria02-descricao",
    status: true,
    imagem: {
      nomeOriginal: "principal2.jpg",
      nome: "cac63283-36d3-4251-ad4f-bf125445be81.jpeg",
      tipo: "image/jpeg",
    },
  },
];

const criaCategoria = async () => {
  await categoria.create(dataCategoria);
};

criaCategoria();


