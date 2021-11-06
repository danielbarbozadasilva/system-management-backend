const { validaSeEmailJaExiste } = require("./usuario.service");
const { cliente } = require("../models/index");
const { toListItemDTO } = require("../mappers/cliente.mapper");
const { criaHash } = require("../utils/criptografia.util");

const ErrorRegraDeNegocio = require("../utils/errors/erro-regra-negocio");

const ErroUsuarioNaoAutorizado = require("../utils/errors/erro-usuario-nao-autorizado");

const listaTodos = async () => {
  const resultadoDB = await cliente
    .find({})
    .collation({ locale: "en" })
    .sort({ name: 1 });

  return resultadoDB.map((item) => {
    return toListItemDTO(item.toJSON());
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

const pesquisaPorId = async (clienteid) => {
  const resultadoDB = await cliente.find({ _id: clienteid });
  return resultadoDB;
};

const listaCurtida = async (clienteid) => {
  const resultadoDB = await cliente.find({ _id: clienteid });
  return resultadoDB;
};

module.exports = {
  listaTodos,
  listaCurtida,
  cria,
  pesquisaPorId,
};
