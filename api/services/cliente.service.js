const { validaSeEmailJaExiste } = require("./usuario.service");
const { cliente } = require("../models/index");
const { toListItemDTO } = require("../mappers/cliente.mapper");
const { criaHash } = require("../utils/criptografia.util");

const ErrorRegraDeNegocio = require('../utils/errors/erro-regra-negocio');

const ErroUsuarioNaoAutorizado = require('../utils/errors/erro-usuario-nao-autorizado');


const listaTodos = async () => {
  const resultadoDB = await cliente.find({}).collation({'locale':'en'}).sort({"nome":1});

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


const pesquisaPorId = async ({ usuario, clienteid }) => {

  // if (usuario.tipoUsuario !== 1) {
  //   if (usuario.id !== clienteid)
  //     throw new ErroUsuarioNaoAutorizado()
  // }

  const resultadoDB = await cliente.find({ _id: clienteid }).populate({
    path: 'curtidas', model: 'curtida',
    populate: {
      path: 'fornecedor', model: 'fornecedor'
    }
  });



  const { _id, curtidas, nome, email } = resultadoDB[0];

  return {
    data: {

      id: _id,
      nome,
      email,

      curtidas: curtidas ? curtidas.reduce((acc, item) => {

        const { nomeFantasia, email } = item.fornecedor;

        return [...acc, {
          id: item._id,
          nomeFantasia,
          email,
        }]

      }, []) : [],

    }
  }

}


module.exports = {
  listaTodos,
  cria,
  pesquisaPorId
};
