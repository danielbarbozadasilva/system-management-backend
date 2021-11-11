const { provider } = require('../models/models.index');

const { toListItemDTO } = require('../mappers/mappers.provider');
const {
  ServiceValidateEmailExists,
  ServiceValidateCnpjExists,
} = require('../services/services.user');
const { createHash } = require('../utils/utils.cryptography');
const emailUtils = require('../utils/utils.email');

const { EmailEnable } = require('../utils/utils.email.message.enable');
const { EmailDisable } = require('../utils/utils.email.message.disable');

const ServiceListAllProvider = async () => {
  const resultadoDB = await provider.find({}).sort({ fantasy_name: 1 });
  return {
    success: true,
    message: 'Operation performed successfully',
    data: {
      ...toListItemDTO(resultadoDB),
    },
  };
};


const ServiceListProviderById = async (providerid) => {
  const providerDB = await provider.findById(providerid);

  if (!providerDB) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['The supplier does not exist'],
    };
  }

  return {
    success: true,
    data: providerDB.toJSON(),
  };
};


const ServiceListProvidersByLocation = async (uf, city) => {
  let filter = {};
  if (city == undefined || city == 'x') {
    filter = { uf };
  } else {
    filter = { uf, city };
  }
  const resultadoDB = await provider.find(filter);
  return res.send(resultadoDB);
};

const ServiceCreateProvider = async (model) => {
  const {
    cnpj,
    fantasy_name,
    Address,
    uf,
    city,
    responsible,
    phone,
    email,
    password,
    status,
  } = model;

  if (await ServiceValidateCnpjExists(cnpj))
    return {
      success: false,
    message: 'Operation performed successfully',
      details: ['There is already a registered provider for the entered cnpj'],
    };

  if (await ServiceValidateEmailExists(email))
    return {
      success: false,
    message: 'Operation performed successfully',
      details: ['There is already a registered user for the email entered'],
    };

  const newProvider = await provider.create({
    cnpj,
    fantasy_name,
    Address,
    uf,
    city,
    responsible,
    phone,
    email,
    password: createHash(password),
    status: 'Analysis',
  });
  return {
    success: true,
    message: 'Operation performed successfully',
    data: {
      ...toListItemDTO(newProvider),
    },
  };
};

const ServiceUpdateProvider = async (provider_id, body) => {
  const {
    cnpj,
    fantasy_name,
    Address,
    uf,
    city,
    responsible,
    phone,
    email,
    password,
    status,
  } = body;

  if (await ServiceValidateCnpjExists(cnpj)) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['There is already a registered provider for the entered cnpj'],
    };
  }

  if (await ServiceValidateEmailExists(email)) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['There is already a registered provider for the entered email'],
    };
  }

  const newProvider = await provider.updateOne(
    { _id: provider_id },
    {
      $set: {
        cnpj = cnpj,
        fantasy_name = fantasy_name,
        Address = Address,
        uf = uf,
        city = city,
        responsible = responsible,
        phone = phone,
        email = email,
        password = password,
        status = status,
      },
    }
  );

  return {
    success: true,
    message: 'Operation performed successfully',
    data: {
      ...toListItemDTO(newProvider),
    },
  };
};


const ServiceChangeStatus = async (id, status) => {
  const providerDB = await provider.findById(id);

  if (!providerDB) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['There is no provider registered for the provided id provider'],
    };
  }

  providerDB.status = status;

  await providerDB.save();

  if (status === 'Enable') {
    emailUtils.enviar({
      recipient: providerDB.email,
      sender: process.env.SENDGRID_SENDER,
      subject: `Confirmação de Ativação ${providerDB.fantasy_name}`,
      body: EmailEnable('title', 'message', `${process.env.URL}/signin`),
    });
  }

  if (status === 'Disable') {
    emailUtils.enviar({
      recipient: providerDB.email,
      sender: process.env.SENDGRID_SENDER,
      subject: `Confirmação de Inativação ${providerDB.fantasy_name}`,
      body: EmailDisable('title', 'message', `${process.env.URL}/signin`),
    });
  }

  return {
    success: true,
    message: 'Operation performed successfully',
    data: {
      ...toListItemDTO(providerDB.toJSON()),
    },
  };
};

const ServiceListLikesClient = async (filtro) => {
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


const ServiceListProductsProvider = async (providerid) => {
  const providerFromDB = await provider
    .findById({ _id: providerid })
    .populate('products');
  return providerFromDB;
};

const ServiceEnableProvider = async (id) => {
  const resultService = await providerService.alteraStatus(id, 'ENABLE');
  const codigoRetorno = resultService.success ? 200 : 400;
  const dadoRetorno = resultService.success
    ? { data: resultService.data }
    : { details: resultService.details };
  return res.status(codigoRetorno).send({
        message: 'Operation performed successfully',
    ...dadoRetorno,
  });
};

const ServiceDisableProvider = async (id) => {
  const resultService = await providerService.alteraStatus(id, 'Disable');
  const codigoRetorno = resultService.success ? 200 : 400;
  const dadoRetorno = resultService.success
    ? { data: resultService.data }
    : { details: resultService.details };
  return res.status(codigoRetorno).send({
    message: 'Operation performed successfully',
    ...dadoRetorno,
  });
};

module.exports = {
  ServiceListAllProvider,
  ServiceListProviderById,
  ServiceCreateProvider,
  ServiceUpdateProvider,
  ServiceChangeStatus,
  ServiceListProductsProvider,
  ServiceListLikesClient,
  ServiceListProvidersByLocation,
  ServiceEnableProvider,
  ServiceDisableProvider,
};
