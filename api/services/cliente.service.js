const { validaSeEmailJaExiste } = require("./usuario.service");
const { cliente } = require("../models/index");
const { toListItemDTO } = require("../mappers/cliente.mapper");
const { criaHash } = require("../utils/criptografia.util");
const {toDTO, toListItemDTOFornec} = require("../mappers/fornecedor.mapper")

const listaTodos = async () => {
  const resultadoDB = await cliente.find({}).collation({'locale':'en'}).sort({"nome":1});

  return resultadoDB.map((item) => {
    return toListItemDTO(item.toJSON());
  });
};

const listaTodosCurtidos = async (filtro) => {
console.log('-------'+filtro);
  const resultadoDB = await cliente.find({ '_id': filtro }).collation({'locale':'en'}).sort({"nome":1})
  .populate({
    path: "curtidas",
    model: "curtida",
    populate: {
    path:  "fornecedor",
     model: "fornecedor",
    }
  });

   return resultadoDB.map((item) => {
    return item.curtidas.map((c) => {
      return c.fornecedor
  });
    });
};
const cria = async (model) => {
  const { email, senha, ...resto } = model;
  if (await validaSeEmailJaExiste(email))
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: ["Já existe usuário cadastrado para o email informado"],
    };

  const novoCliente = await cliente.create({
    email,
    ...resto,
    senha: criaHash(senha),
    status: "Ativo",
  });

  return {
    sucesso: true,
    mensagem: "Operação realizada com sucesso",
    data: {
      ...toListItemDTO(novoCliente),
    },
  };
};

module.exports = {
  listaTodos,
  cria,
  listaTodosCurtidos
};
