const { validaSeEmailJaExiste } = require('./usuario.service');
const { client } = require('../models/models.index');
const { toListItemDTO } = require('../mappers/mappers.client');
const { criaHash } = require('../utils/criptografia.util');

const ErrorRegraDeNegocio = require('../utils/errors/erro-regra-negocio');

const ErroUsuarioNaoAutorizado = require('../utils/errors/erro-usuario-nao-autorizado');

const listaTodos = async () => {
  const resultadoDB = await client
    .find({})
    .collation({ locale: 'en' })
    .sort({ name: 1 });

  return resultadoDB.map((item) => {
    return toListItemDTO(item.toJSON());
  });
};

const cria = async (model) => {
  const { email, senha, ...rest } = model;
  if (await validaSeEmailJaExiste(email))
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: ['Já existe usuário cadastrado para o email informado'],
    };

  const newclient = await client.create({
    email,
    ...rest,
    senha: criaHash(senha),
    status: 'Ativo',
  });

  return {
    sucesso: true,
    mensagem: 'Operação realizada com sucesso',
    data: {
      ...toListItemDTO(newclient),
    },
  };
};

const pesquisaPorId = async (clientid) => {
  const resultadoDB = await client.find({ _id: clientid });
  return resultadoDB;
};

const listalike = async (clientid) => {
  const resultadoDB = await client.find({ _id: clientid });
  return resultadoDB;
};

module.exports = {
  listaTodos,
  listalike,
  cria,
  pesquisaPorId,
};
