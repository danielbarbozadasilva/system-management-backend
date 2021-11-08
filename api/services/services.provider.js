const { provider, like, client } = require('../models/models.index');

const { toListItemDTO, toDTOLikeCase } = require('../mappers/mappers.provider');
const {
  validaSeEmailJaExiste,
  validaSeCnpjJaExiste,
  buscatypeuserPorId,
} = require('../services/user.service');
const { criaHash } = require('../utils/criptografia.util');
const emailUtils = require('../utils/email.utils');
const { EmailHabilitar } = require('../utils/email.mensagem.habilitar');
const { EmailDesativar } = require('../utils/email.mensagem.desativar');

const createProvider = async (model) => {
  const {
    cnpj,
    fantasy_name,
    endereco,
    uf,
    cidade,
    responsavel,
    telefone,
    email,
    senha,
    status,
  } = model;

  if (await validaSeCnpjJaExiste(cnpj))
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: ['Já existe provider cadastrado para o cnpj informado'],
    };

  if (await validaSeEmailJaExiste(email))
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: ['Já existe usuário cadastrado para o email informado'],
    };

  const newProvider = await provider.create({
    cnpj,
    fantasy_name,
    endereco,
    uf,
    cidade,
    responsavel,
    telefone,
    email,
    senha: criaHash(senha),
    status: 'Analise',
  });
  return {
    sucesso: true,
    mensagem: 'Operação realizada com sucesso',
    data: {
      ...toDTOLikeCase(newProvider),
    },
  };
};

const updateProvider = async (providerid, body) => {
  const {
    cnpj,
    fantasy_name,
    endereco,
    uf,
    cidade,
    responsavel,
    telefone,
    email,
    senha,
    status,
  } = body;

  if (await validaSeCnpjJaExiste(cnpj)) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: ['Já existe provider cadastrado para o cnpj informado'],
    };
  }

  if (await validaSeEmailJaExiste(email)) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: ['Já existe usuário cadastrado para o email informado'],
    };
  }

  const newProvider = await provider.update(
    { _id: providerid },
    {
      $set: {
        cnpj: cnpj,
        fantasy_name: fantasy_name,
        endereco: endereco,
        uf: uf,
        cidade: cidade,
        responsavel: responsavel,
        telefone: telefone,
        email: email,
        senha: criaHash(senha),
        status: 'Analise',
      },
    }
  );

  return {
    sucesso: true,
    mensagem: 'Operação realizada com sucesso',
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
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: ['Não existe provider cadastrado para o provider id informado'],
    };
  }

  providerDB.status = status;

  await providerDB.save();

  if (status === 'Ativo') {
    emailUtils.enviar({
      destinatario: providerDB.email,
      remetente: process.env.SENDGRID_REMETENTE,
      assunto: `Confirmação de Ativação ${providerDB.fantasy_name}`,
      corpo: EmailHabilitar('titulo', 'menssagem', `${process.env.URL}/signin`),
    });
  }

  if (status === 'Inativo') {
    emailUtils.enviar({
      destinatario: providerDB.email,
      remetente: process.env.SENDGRID_REMETENTE,
      assunto: `Confirmação de Inativação ${providerDB.fantasy_name}`,
      corpo: EmailDesativar('titulo', 'menssagem', `${process.env.URL}/signin`),
    });
  }

  return {
    sucesso: true,
    mensagem: 'Operação realizada com sucesso',
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
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: ['o provider pesquisado não existe'],
    };
  }

  return {
    sucesso: true,
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
