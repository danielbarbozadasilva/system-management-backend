const { validaSeEmailJaExiste } = require("./usuario.service");
const { cliente } = require("../models/index");
const { toListItemDTO, toDTO } = require("../mappers/cliente.mapper");
const { criaHash } = require("../utils/criptografia.util");

const listaTodos = async () => {
  const resultadoDB = await cliente.find({}).collation({'locale':'en'}).sort({"nome":1});

  return resultadoDB.map((item) => {
    return toListItemDTO(item.toJSON());
  });
};

const listaTodosCurtidos = async (filtro) => {
      const filtros = new ObjectID(filtro.trim());                                       

  const resultadoDB = await cliente.find({ '_id': filtros }).collation({'locale':'en'}).sort({"nome":1})
  .populate({
    path: "curtidas",
    model: "curtida"
  });

  return resultadoDB
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
