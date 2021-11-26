const { provider, product, like } = require('../models/models.index');
const serviceUserProvider = require('../services/services.user');
const emailUtils = require('../utils/utils.email');
const { UtilCreateHash } = require('../utils/utils.cryptography');
const { toItemListDTO, toDTO } = require('../mappers/mappers.provider');
const { EmailEnable } = require('../utils/utils.email.message.enable');
const { EmailDisable } = require('../utils/utils.email.message.disable');

const ServiceListAllProvider = async () => {
  const resultDB = await provider.find({}).sort({ fantasy_name: 1 });
  return {
    success: true,
    message: 'Operation performed successfully',
    data: resultDB.map((item) => {
      return toDTO(item);
    }),
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
    data: [toDTO(resultDB)],
  };
};

const ServiceListProductsProvider = async (providerid) => {
  const resultDB = await product
    .find({ provider: providerid })
    .populate('provider');

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
      data: resultDB.map((item) => {
        return toItemListDTO(item);
      }),
    };
  }
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
    data: resultDB.map((item) => {
      return toDTO(item);
    }),
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

  const resultDB = await provider.create({
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
    status: 'ANALYSIS',
  });

  return {
    success: true,
    message: 'Operation performed successfully',
    data: [toDTO(resultDB)],
  };
};

const ServiceUpdateProvider = async (provider_id, body) => {
  const resultFind = await provider
    .findById({ _id: provider_id })
    .sort({ fantasy_name: 1 });

  if (!resultFind) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ["provider id doesn't exist."],
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
      message: 'Data updated successfully',
      data: {
        ...toDTO(new_provider),
      },
    };
  }
};

const ServiceRemoveProvider = async (provider_id) => {
  const providerDB = await provider.findOne({ _id: provider_id });

  if (!providerDB) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ["provider id doesn't exist."],
    };
  }
  const deleteProductDB = await product.deleteMany({ provider: provider_id });
  const deleteLikeDB = await like.deleteMany({ _id: provider_id });
  const deleteProviderDB = await provider.deleteOne({ _id: provider_id });

  if (
    deleteProductDB.ok == 1 &&
    deleteLikeDB.ok == 1 &&
    deleteProviderDB.ok == 1
  ) {
    return {
      success: true,
      message: 'Operation performed successfully',
    };
  } else if (
    deleteProductDB.ok !== 1 ||
    deleteLikeDB.ok !== 1 ||
    deleteProviderDB.ok !== 1
  ) {
    return {
      success: false,
      details: 'Error deleting provider and products',
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
    if (status === 'ENABLE' || status === 'ANALYSIS') {
      emailUtils.UtilSendEmail({
        to: providerDB.email,
        from: process.env.SENDGRID_SENDER,
        subject: `Activation Confirmation ${providerDB.social_name}`,
        html: EmailEnable('subject', `${process.env.URL}/signin`),
      });
    } else if (status === 'DISABLE') {
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

module.exports = {
  ServiceListAllProvider,
  ServiceListProviderById,
  ServiceCreateProvider,
  ServiceUpdateProvider,
  ServiceChangeStatus,
  ServiceRemoveProvider,
  ServiceListProvidersByLocation,
  ServiceListProductsProvider,
};
