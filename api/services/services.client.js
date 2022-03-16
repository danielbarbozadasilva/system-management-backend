const { verifyEmailService, verifyEmailBodyExistService } = require('./services.user')
const { client } = require('../models/models.index')
const { toDTO } = require('../mappers/mappers.client')
const { UtilCreateHash } = require('../utils/utils.cryptography')

const listAllClientService = async () => {
  const resultadoDB = await client.find({}).sort({ name: 1 })
  if (!resultadoDB) {
    return {
      success: false,
      details: 'No categories found'
    }
  }
  return {
    success: true,
    message: 'Operation performed successfully',
    data: resultadoDB.map((item) => toDTO(item))
  }
}

const listClientByIdService = async (clientId) => {
  const resultadoDB = await client.findById({ _id: clientId })
  if (!resultadoDB) {
    return {
      success: false,
      details: 'No categories found'
    }
  }
  return {
    success: true,
    message: 'Operation performed successfully',
    data: {
      ...toDTO(resultadoDB)
    }
  }
}

const createClientService = async (model) => {
  const {
    firstName,
    lastName,
    birthDate,
    phone,
    uf,
    city,
    email,
    password
  } = model

  if (!(await verifyEmailBodyExistService(email))) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['There is already a registered user for the network email']
    }
  }

  const newClient = await client.create({
    firstName,
    lastName,
    birthDate: new Date(birthDate),
    phone,
    uf,
    city,
    email,
    password: UtilCreateHash(password),
    status: 'ENABLE'
  })
  if (!newClient) {
    return {
      success: false,
      details: 'No categories found'
    }
  }
  return {
    success: true,
    message: 'Operation performed successfully',
    data: {
      ...toDTO(newClient)
    }
  }
}

const updateClientService = async (clientId, body) => {
  const resultFind = await client.findById({ _id: clientId })

  if (!resultFind) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ["client id doesn't exist."]
    }
  }
  if (await verifyEmailService(clientId, body.email)) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['There is already a registered user for the network email']
    }
  }

  const newClient = await client.updateOne(
    { _id: clientId },
    {
      $set: {
        firstName: body.firstName,
        lastName: body.lastName,
        birthDate: body.birthDate,
        phone: body.phone,
        uf: body.uf,
        city: body.city,
        email: body.email,
        password: UtilCreateHash(body.password)
      }
    }
  )
  if (!newClient) {
    return {
      success: false,
      message: 'Error updating data'
    }
  }

  return {
    success: true,
    message: 'Data updated successfully'
  }
}

const deleteClientService = async (clientId) => {
  const resultFind = await client.findById({ _id: clientId })

  if (!resultFind) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ["client id doesn't exist."]
    }
  }
  const deleteProviderDB = await client.deleteOne({ _id: clientId })

  if (!deleteProviderDB) {
    return {
      success: false,
      message: 'Error deleting customer'
    }
  }
  return {
    success: true,
    message: 'Client deleted successfully'
  }
}

module.exports = {
  listAllClientService,
  listClientByIdService,
  createClientService,
  updateClientService,
  deleteClientService
}
