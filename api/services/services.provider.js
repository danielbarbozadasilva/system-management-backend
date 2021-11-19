const { provider } = require('../models/models.index');
const serviceUserProvider = require('../services/services.user');
const emailUtils = require('../utils/utils.email');
const { UtilCreateHash } = require('../utils/utils.cryptography');
const { toListItemDTO } = require('../mappers/mappers.provider');
const { EmailEnable } = require('../utils/utils.email.message.enable');
const { EmailDisable } = require('../utils/utils.email.message.disable');

const ServiceListAllProvider = async () => {
  const resultDB = await provider.find({}).sort({ fantasy_name: 1 });
  return {
    success: true,
    message: 'Operation performed successfully',
    data: {
      ...toListItemDTO(...resultDB),
    },
  };
};

const ServiceListProviderById = async (id) => {
  const resultDB = await provider.findById({
    _id: Object(id),
  });
  if (!resultDB) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['The supplier does not exist'],
    };
  }

  return {
    success: true,
    message: 'operation performed successfully',
    data: { ...toListItemDTO(resultDB) },
  };
};

const ServiceListProvidersByLocation = async (uf, city) => {
  let filter = {};
  if (city == undefined || city == 'x') {
    filter = { uf };
  } else {
    filter = { uf, city };
  }
  const resultDB = await provider.find(filter);
  if (!resultDB) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['The value does not exist'],
    };
  }
  return {
    success: true,
    message: 'operation performed successfully',
    data: { ...resultDB },
  };
};

const ServiceCreateProvider = async (model) => {
  const {
    cnpj,
    fantasy_name,
    social_name,
    address,
    uf,
    city,
    responsible,
    phone,
    email,
    password,
    status,
  } = model;

  if (await serviceUserProvider.ServiceVerifyCnpjExists(cnpj))
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['There is already a registered provider for the entered cnpj'],
    };

  if (await serviceUserProvider.ServiceVerifyEmailExists(email))
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['There is already a registered user for the email entered'],
    };

  const newProvider = await provider.create({
    cnpj,
    fantasy_name,
    social_name,
    address,
    uf,
    city,
    responsible,
    phone,
    email,
    password: UtilCreateHash(password),
    status: 'analysis',
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
  const resultFind = await provider
    .findById(Object({ _id: provider_id }))
    .sort({ fantasy_name: 1 });

  if (!resultFind) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ["category_id doesn't exist."],
    };
  }

  if (await serviceUserProvider.ServiceVerifyCnpj(provider_id, body.cnpj)) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['There is already a registered provider for the entered cnpj'],
    };
  }

  if (await serviceUserProvider.ServiceVerifyEmail(provider_id, body.email)) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['There is already a registered provider for the entered email'],
    };
  }

  const new_provider = await provider.updateOne(
    { _id: provider_id },
    {
      $set: {
        cnpj: body.cnpj,
        fantasy_name: body.fantasy_name,
        social_name: body.social_name,
        address: body.address,
        uf: body.uf,
        city: body.city,
        responsible: body.responsible,
        phone: body.phone,
        email: body.email,
        password: UtilCreateHash(body.password),
      },
    }
  );
  if (!new_provider) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['The value does not exist'],
    };
  } else {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: {
        ...toListItemDTO(new_provider),
      },
    };
  }
};

const ServiceChangeStatus = async (provider_id, status) => {
  const providerDB = await provider.findOne({ _id: provider_id });

  if (!providerDB) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['There is no provider registered for the provided id provider'],
    };
  }

  const resultDB = await provider.updateOne(
    { _id: provider_id },
    {
      $set: {
        status: status,
      },
    }
  );

  if (resultDB) {
    if (status === 'enable' || status === 'analysis') {
      emailUtils.UtilSendEmail({
        to: providerDB.email,
        from: process.env.SENDGRID_SENDER,
        subject: `Activation Confirmation ${providerDB.social_name}`,
        html: EmailEnable('subject', `${process.env.URL}/signin`),
      });
    } else if (status === 'disable') {
      emailUtils.UtilSendEmail({
        to: providerDB.email,
        from: process.env.SENDGRID_SENDER,
        subject: `Inactivation Confirmation ${providerDB.social_name}`,
        html: EmailDisable('subject'),
      });
    }
    return {
      success: true,
      message: 'Operation performed successfully',
    };
  } else {
    if (!resultDB) {
      return {
        success: false,
        message: 'operation cannot be performed',
      };
    }
  }
};

const ServiceListLikesClient = async (filtro) => {
  const resultDB = await provider.find({ _id: filtro }).populate({
    path: 'likes',
    model: 'like',
    populate: {
      path: 'clients',
      model: 'client',
    },
  });

  if (!resultDB) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['The value does not exist'],
    };
  } else {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: {
        ...toListItemDTO(resultDB.toJSON()),
      },
    };
  }
};


module.exports = {
  ServiceListAllProvider,
  ServiceListProviderById,
  ServiceCreateProvider,
  ServiceUpdateProvider,
  ServiceChangeStatus,
  ServiceListLikesClient,
  ServiceListProvidersByLocation,
};
