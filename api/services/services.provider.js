const { provider } = require('../models/models.index');

const { toListItemDTO, toDTOLikeCase } = require('../mappers/mappers.provider');
const {
  ServiceValidateEmailExists,
  ServiceValidateCnpjExists,
  buscatypeuserPorId,
} = require('../services/user.service');
const { createHash } = require('../utils/criptografia.util');
const emailUtils = require('../utils/email.utils');
const { EmailHabilitar } = require('../utils/email.message.habilitar');
const { EmailDesACTIVE } = require('../utils/email.message.desACTIVE');

const createProvider = async (model) => {
  const {
    cnpj,
    fantasy_name,
    Address,
    uf,
    cidade,
    responsavel,
    telefone,
    email,
    password,
    status,
  } = model;

  if (await ServiceValidateCnpjExists(cnpj))
    return {
      success: false,
      message: 'operação não pode ser realizada',
      details: ['Já existe provider cadastrado para o cnpj informado'],
    };

  if (await ServiceValidateEmailExists(email))
    return {
      success: false,
      message: 'operação não pode ser realizada',
      details: ['Já existe usuário cadastrado para o email informado'],
    };

  const newProvider = await provider.create({
    cnpj,
    fantasy_name,
    Address,
    uf,
    cidade,
    responsavel,
    telefone,
    email,
    password: createHash(password),
    status: 'Analise',
  });
  return {
    success: true,
    message: 'Operação realizada com success',
    data: {
      ...toDTOLikeCase(newProvider),
    },
  };
};

const updateProvider = async (providerid, body) => {
  const {
    cnpj,
    fantasy_name,
    Address,
    uf,
    cidade,
    responsavel,
    telefone,
    email,
    password,
    status,
  } = body;

  if (await ServiceValidateCnpjExists(cnpj)) {
    return {
      success: false,
      message: 'operação não pode ser realizada',
      details: ['Já existe provider cadastrado para o cnpj informado'],
    };
  }

  if (await ServiceValidateEmailExists(email)) {
    return {
      success: false,
      message: 'operação não pode ser realizada',
      details: ['Já existe usuário cadastrado para o email informado'],
    };
  }

  const newProvider = await provider.update(
    { _id: providerid },
    {
      $set: {
        cnpj: cnpj,
        fantasy_name: fantasy_name,
        Address: Address,
        uf: uf,
        cidade: cidade,
        responsavel: responsavel,
        telefone: telefone,
        email: email,
        password: createHash(password),
        status: 'Analise',
      },
    }
  );

  return {
    success: true,
    message: 'Operação realizada com success',
    data: {
      ...toDTOLikeCase(newProvider),
    },
  };
};

const listAll = async () => {
  const resultadoDB = await provider.find({}).sort({ fantasy_name: 1 });
  return resultadoDB;
};

const alteraStatus = async (id, status) => {
  const providerDB = await provider.findById(id);

  if (!providerDB) {
    return {
      success: false,
      message: 'operação não pode ser realizada',
      details: ['Não existe provider cadastrado para o provider id informado'],
    };
  }

  providerDB.status = status;

  await providerDB.save();

  if (status === 'Active') {
    emailUtils.enviar({
      destinatario: providerDB.email,
      remetente: process.env.SENDGRID_REMETENTE,
      assunto: `Confirmação de Ativação ${providerDB.fantasy_name}`,
      corpo: EmailHabilitar('titulo', 'menssagem', `${process.env.URL}/signin`),
    });
  }

  if (status === 'INACTIVATE') {
    emailUtils.enviar({
      destinatario: providerDB.email,
      remetente: process.env.SENDGRID_REMETENTE,
      assunto: `Confirmação de Inativação ${providerDB.fantasy_name}`,
      corpo: EmailDesACTIVE('titulo', 'menssagem', `${process.env.URL}/signin`),
    });
  }

  return {
    success: true,
    message: 'Operação realizada com success',
    data: {
      ...toListItemDTO(providerDB.toJSON()),
    },
  };
};

const listLikeClient = async (filtro) => {
  const resultadoDB = await provider.find({ _id: filtro }).populate({
    path: 'likes',
    model: 'like',
    populate: {
      path: 'clients',
      model: 'client',
    },
  });

  return resultadoDB;
};

const listProductsProvider = async (providerid) => {
  const providerFromDB = await provider
    .findById({ _id: providerid })
    .populate('products');
  return providerFromDB;
};

const listProviderById = async (providerid) => {
  const providerDB = await provider.findById(providerid);

  if (!providerDB) {
    return {
      success: false,
      message: 'operação não pode ser realizada',
      details: ['o provider SEARCHdo não existe'],
    };
  }

  return {
    success: true,
    data: providerDB.toJSON(),
  };
};

module.exports = {
  createProvider,
  updateProvider,
  alteraStatus,
  listProviderById,
  listProductsProvider,
  listAll,
  listLikeClient,
};
