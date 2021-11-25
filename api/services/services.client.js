const { ServiceVerifyEmailExists } = require('./services.user');
const { client } = require('../models/models.index');
const { toDTO } = require('../mappers/mappers.client');
const { UtilCreateHash } = require('../utils/utils.cryptography');

const ServiceListAll = async () => {
  const resultadoDB = await client.find({}).sort({ name: 1 });
  if (resultadoDB) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultadoDB.map((item) => {
        return toDTO(item);
      }),
    };
  } else {
    return {
      success: false,
      details: 'No categories found',
    };
  }
};

const ServiceSearchById = async (clientid) => {
  const resultadoDB = await client.findById({ _id: clientid });
  if (resultadoDB) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: {
        ...toDTO(resultadoDB),
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
  if (await ServiceVerifyEmailExists(email))
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

const ServiceUpdateClient = async (client_id, body) => {
  const resultFind = await client.findById({ _id: client_id });

  if (!resultFind) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ["client id doesn't exist."],
    };
  }

  const new_client = await client.updateOne(
    { _id: client_id },
    {
      $set: {
        first_name: body.first_name,
        last_name: body.last_name,
        birth_date: body.birth_date,
        phone: body.phone,
        uf: body.uf,
        city: body.city,
        email: body.email,
        password: UtilCreateHash(body.password),
      },
    }
  );
  if (!new_client) {
    return {
      success: false,
      message: 'Error updating data',
    };
  } else {
    return {
      success: true,
      message: 'Data updated successfully',
    };
  }
};

const ServiceDeleteClient = async (client_id) => {
  const resultFind = await client.findById({ _id: client_id });

  if (!resultFind) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ["client id doesn't exist."],
    };
  }
  const deleteProviderDB = await client.deleteOne({ _id: client_id });

  if (!deleteProviderDB) {
    return {
      success: false,
      message: 'Error deleting customer',
    };
  } else {
    return {
      success: true,
      message: 'Client deleted successfully',
    };
  }
};

module.exports = {
  ServiceListAll,
  ServiceSearchById,
  ServiceCreate,
  ServiceUpdateClient,
  ServiceDeleteClient,
};
