const { ObjectId } = require('mongodb')
const { client, provider } = require('../models/models.index')
const { createHash } = require('../utils/utils.cryptography')
const { toDTO, toDTOListProviderLike } = require('../mappers/mappers.client')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllClientService = async () => {
  try {
    const resultDB = await client.find({}).sort({ name: 1 })
    if (!resultDB) {
      return {
        success: false,
        details: 'No client found'
      }
    }
    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.map((item) => toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listClientByIdService = async (clientId) => {
  const resultDB = await client.findById({ _id: clientId })
  return {
    success: true,
    message: 'Operation performed successfully',
    data: toDTO(resultDB)
  }
}

const createClientService = async (body) => {
  try {
    const newClient = await client.create({
      firstName: body.firstName,
      lastName: body.lastName,
      birthDate: new Date(body.birthDate),
      phone: body.phone,
      uf: body.uf,
      city: body.city,
      email: body.email,
      password: createHash(body.password),
      status: 'ENABLE'
    })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: toDTO(newClient)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateClientService = async (clientId, body) => {
  try {
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
          password: createHash(body.password)
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
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const deleteClientService = async (clientId) => {
  try {
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
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
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

  return {
    success: true,
    message: 'Operation performed successfully!',
    data: toDTOListProviderLike(...resultLikeDB)
  }
}

const createLikeClientProviderService = async (providerId, clientId) => {
  try {
    const resultDB = await client.findByIdAndUpdate(clientId, {
      $push: { likes: providerId }
    })

    if (resultDB) {
      return {
        success: true,
        message: 'Fornecedor curtido com sucesso!'
      }
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const removeLikeClientProviderService = async (providerId, clientId) => {
  try {
    await client.updateOne(
      { _id: ObjectId(`${clientId}`) },
      { $pull: { likes: `${providerId}` } }
    )

    return {
      success: true,
      data: {
        message: 'A curtida foi removida com sucesso!'
      }
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
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
