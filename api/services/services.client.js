const { client, provider } = require('../models/models.index')
const { ObjectId } = require('mongodb')
const {
  verifyEmailService,
  verifyEmailBodyExistService
} = require('./services.user')
const { toDTO } = require('../mappers/mappers.client')
const { UtilCreateHash } = require('../utils/utils.cryptography')
const { toDTOLikeLength } = require('../mappers/mappers.client')
const { toDTOListProviderLike } = require('../mappers/mappers.client')

const listAllClientService = async () => {
  const resultadoDB = await client.find({}).sort({ name: 1 })
  if (!resultadoDB) {
    return {
      success: false,
      details: 'No client found'
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
      details: 'No client found'
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
  const { firstName, lastName, birthDate, phone, uf, city, email, password } =
    model

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
      details: 'No client found'
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

const listLikesClientProviderService = async (clientId) => {
  const resultLikeDB = await client.aggregate([
    { $match: { _id: ObjectId(clientId) } },
    {
      $lookup: {
        from: provider.collection.name,
        localField: 'likes',
        foreignField: '_id',
        as: 'result_likes'
      }
    }
  ])

  if (resultLikeDB == 0) {
    return {
      success: false,
      details: 'No likes found!'
    }
  }
  if (resultLikeDB !== 0) {
    return {
      success: true,
      message: 'Operation performed successfully!',
      data: toDTOListProviderLike(...resultLikeDB)
    }
  }
}

const createLikeClientProviderService = async (providerId, clientId) => {
  const [providerDB, clientDB, likeDB, resultLike] = await Promise.all([
    provider.findById(providerId),
    client.findById(clientId),
    client.aggregate([
      { $match: { _id: ObjectId(clientId) } },
      {
        $lookup: {
          from: provider.collection.name,
          localField: 'likes',
          foreignField: '_id',
          as: 'likes'
        }
      }
    ]),
    client.find({ _id: `${clientId}`, likes: `${providerId}` })
  ])

  if (!providerDB) {
    return {
      success: false,
      details: 'O fornecedor informado não existe!'
    }
  }

  if (!clientDB) {
    return {
      success: false,
      details: 'O cliente informado não existe!'
    }
  }

  if (toDTOLikeLength(...likeDB) >= 3) {
    return {
      success: false,
      details: 'O cliente não pode curtir mais de três fornecedores!'
    }
  }
  if (resultLike.length !== 0) {
    return {
      success: false,
      details: 'O cliente já curtiu esse fornecedor!'
    }
  }

  const resultDB = await client.findByIdAndUpdate(clientId, {
    $push: { likes: providerId }
  })

  if (resultDB) {
    return {
      success: true,
      message: 'Fornecedor curtido com sucesso!',
      data: {
        client: resultDB._id,
        provider: providerId
      }
    }
  }
  return {
    success: false,
    details: 'Erro ao curtir!'
  }
}

const removeLikeClientProviderService = async (providerId, clientId) => {
  const [providerDB, clientDB, likeDB] = await Promise.all([
    provider.findById(providerId),
    client.findById(clientId),
    client.find({ _id: `${clientId}`, likes: `${providerId}` })
  ])

  if (!providerDB) {
    return {
      success: false,
      details: 'O fornecedor informado não existe!'
    }
  }
  if (!clientDB) {
    return {
      success: false,
      details: 'O cliente informado não existe!'
    }
  }
  if (likeDB.length === 0) {
    return {
      success: false,
      details: 'A curtida não existe!'
    }
  }
  if (likeDB.length !== 0) {
    const resultLike = await client.updateOne(
      { _id: ObjectId(`${clientId}`) },
      { $pull: { likes: `${providerId}` } }
    )
    if (resultLike) {
      return {
        success: true,
        data: {
          message: 'A curtida foi removida com sucesso!'
        }
      }
    }
    return {
      success: false,
      details: 'Erro ao remover a curtida!'
    }
  }
}

module.exports = {
  listAllClientService,
  listClientByIdService,
  createClientService,
  updateClientService,
  deleteClientService,
  listLikesClientProviderService,
  createLikeClientProviderService,
  removeLikeClientProviderService
}
