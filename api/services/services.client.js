const { ServiceValidateEmailExists } = require('./services.user');
const { client } = require('../models/models.index');
const { toDTO } = require('../mappers/mappers.client');
const { UtilCreateHash } = require('../utils/utils.cryptography');

const ServiceListAll = async () => {
  const resultadoDB = await client.find({}).sort({ name: 1 });
  if (resultadoDB) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: {
        ...toDTO(resultadoDB.toJSON()),
      },
    };
  } else {
    return {
      success: false,
      details: 'No categories found',
    };
  }
};

const ServiceCreate = async (model) => {
  const { email, password, ...rest } = model;
  if (await ServiceValidateEmailExists(email))
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['There is already a registered user for the network email'],
    };

  const new_client = await client.create({
    email,
    ...rest,
    password: UtilCreateHash(password),
    status: 'Enable',
  });
  if (new_client) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: {
        ...toDTO(new_client),
      },
    };
  } else {
    return {
      success: false,
      details: 'No categories found',
    };
  }
};

const ServiceSearchById = async () => {
  const resultadoDB = await client.find({ _id: clientid });
  if (resultadoDB) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: {
        ...toDTO(resultadoDB.toJSON()),
      },
    };
  } else {
    return {
      success: false,
      details: 'No categories found',
    };
  }
};
const ServiceListLike = async () => {
  const resultadoDB = await client.find({ _id: clientid });
  if (resultadoDB) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: {
        ...toDTO(resultadoDB.toJSON()),
      },
    };
  } else {
    return {
      success: false,
      details: 'No categories found',
    };
  }
};

module.exports = {
  ServiceListAll,
  ServiceSearchById,
  ServiceListLike,
  ServiceCreate,
};
