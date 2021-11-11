const { ServiceValidateEmailExists } = require('./services.user');
const { client } = require('../models/models.index');
const { toDTO } = require('../mappers/mappers.client');
const { createHash } = require('../utils/utils.cryptography');

const ServiceListAll = async () => {
  const resultadoDB = await client.find({}).sort({ name: 1 });

  return resultadoDB.map((item) => {
    return toDTO(item.toJSON());
  });
};

const ServiceCreate = async (model) => {
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
    status: 'Enable',
  });

  return {
    success: true,
    message: 'Operação realizada com success',
    data: {
      ...toDTO(newclient),
    },
  };
};

const ServiceSearchById = async (clientid) => {
  const resultadoDB = await client.find({ _id: clientid });
  return resultadoDB;
};

const ServiceListLike = async (clientid) => {
  const resultadoDB = await client.find({ _id: clientid });
  return resultadoDB;
};

module.exports = {
  ServiceListAll,
  ServiceSearchById,
  ServiceListLike,
  ServiceCreate,
};
