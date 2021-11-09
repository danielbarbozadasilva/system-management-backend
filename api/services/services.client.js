const { ServiceValidateEmailExists } = require('./user.service');
const { client } = require('../models/models.index');
const { toDTO } = require('../mappers/mappers.client');
const { createHash } = require('../utils/criptografia.util');

const ErrorBusinessRule = require('../utils/errors/errors.business_rule');
const ErrorUnauthorizedUser = require('../utils/errors/errors.user_not_allowed');

const listaTodos = async () => {
  const resultadoDB = await client.find({}).sort({ name: 1 });

  return resultadoDB.map((item) => {
    return toDTO(item.toJSON());
  });
};

const create = async (model) => {
  const { email, password, ...rest } = model;
  if (await ServiceValidateEmailExists(email))
    return {
      success: false,
      message: 'operação não pode ser realizada',
      details: ['Já existe usuário cadastrado para o email informado'],
    };

  const newclient = await client.create({
    email,
    ...rest,
    password: createHash(password),
    status: 'Active',
  });

  return {
    success: true,
    message: 'Operação realizada com success',
    data: {
      ...toDTO(newclient),
    },
  };
};

const SEARCHPorId = async (clientid) => {
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
  create,
  SEARCHPorId,
};
