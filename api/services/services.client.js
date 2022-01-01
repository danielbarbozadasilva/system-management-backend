const { verifyEmailBodyExistService } = require('./services.user');
const { client } = require('../models/models.index');
const { toDTO } = require('../mappers/mappers.client');
const { UtilCreateHash } = require('../utils/utils.cryptography');

const listAllClientService = async () => {
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

const listClientByIdService = async (clientid) => {
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

const createClientService = async (model) => {
  const {
    first_name,
    last_name,
    birth_date,
    phone,
    uf,
    city,
    email,
    password,
    status,
  } = model;
  if (!(await verifyEmailBodyExistService(email)))
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['There is already a registered user for the network email'],
    };

  const new_client = await client.create({
    first_name,
    last_name,
    birth_date,
    phone,
    uf,
    city,
    email,
    password: UtilCreateHash(password),
    status: 'ENABLE',
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

const updateClientService = async (client_id, body) => {
  const resultFind = await client.findById({ _id: client_id });

  if (!resultFind) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ["client id doesn't exist."],
    };
  }
  if (!(await verifyEmailBodyExistService(body.email))) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['There is already a registered user for the network email'],
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

const deleteClientService = async (client_id) => {
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
  listAllClientService,
  listClientByIdService,
  createClientService,
  updateClientService,
  deleteClientService,
};
