const { ObjectId } = require('mongodb')
const { client, provider } = require('../models/models.index')
const { createHash } = require('../utils/utils.cryptography')
const mapperClient = require('../mappers/mappers.client')
const serviceUserProvider = require('./services.user')
const ErrorGeneric = require('../exceptions/erros.generic-error')

const listAllClientService = async () => {
  try {
    const resultDB = await client.find({}).sort({ name: 1 })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.map((item) => mapperClient.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listClientByIdService = async (clientId) => {
  try {
    const resultDB = await client.findById({ _id: clientId })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: mapperClient.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createClientService = async (body) => {
  try {
    await client.create({
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

    const data = await serviceUserProvider.createCredentialService(body.email)

    return {
      success: true,
      message: 'Operation performed successfully',
      data
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listLikesClientService = async (clientId) => {
  try {
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
      data: mapperClient.toDTOListProviderLike(...resultLikeDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}
const createLikeService = async (providerId, clientId) => {
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

const removeLikeService = async (providerId, clientId) => {
  try {
    await client.updateOne(
      { _id: ObjectId(`${clientId}`) },
      { $pull: { likes: `${providerId}` } }
    )

    return {
      success: true,
      message: 'A curtida foi removida com sucesso!'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllClientService,
  listClientByIdService,
  createClientService,
  listLikesClientService,
  createLikeService,
  removeLikeService
}
