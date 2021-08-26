const { cliente } = require("../../api/models/index");
const criptografia = require("../../api/utils/criptografia.util");

const dataCliente = [
  {
    _id: "60c0d57f1de4cc8015734a17",
    kind: "cliente",
    email: "cliente@gmail.com",
    nome: "teste-cliente",
    data_nascimento: "05/03/1997",
    uf: "RJ",
    cidade: "São Gonçalo",
    senha: criptografia.criaHash("cliente"),
    status: "Ativo",
    curtidas: ["60d94b02703db4d2a34f16ee"],
  },
];

const criaUsuarioCliente = async () => {
  await cliente.create(dataCliente);
};

criaUsuarioCliente();
