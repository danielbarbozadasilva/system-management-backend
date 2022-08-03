const { ObjectId } = require('mongodb')
const { client, provider } = require('../models/models.index')
const {
  verifyEmailService,
  verifyEmailBodyExistService
} = require('./services.user')
const { UtilCreateHash } = require('../utils/utils.cryptography')
const {
  toDTO,
  toDTOListProviderLike,
  toDTOLikeLength
} = require('../mappers/mappers.client')
const { createCredentialService } = require('./services.user')
const ErrorBusinessRule = require('../utils/errors/errors.business_rule')
const ErrorGeneric = require('../utils/errors/erros.generic_error')

const listAllClientService = async () => {
  try {
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
      data: toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createClientService = async (body) => {
  try {
    let data = {}

    if (await verifyEmailBodyExistService(body.email)) {
      throw new ErrorBusinessRule('Este e-mail já está em uso!')
    }

    const newClient = await client.create({
      firstName: body.firstName,
      lastName: body.lastName,
      birthDate: new Date(body.birthDate),
      phone: body.phone,
      uf: body.uf,
      city: body.city,
      email: body.email,
      password: UtilCreateHash(body.password),
      status: 'ENABLE'
    })

    if (body.auth) {
      data = await createCredentialService(body.email)
    }

    return {
      success: true,
      message: 'Operation performed successfully',
      data: data || { ...toDTO(newClient) }
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateClientService = async (clientId, body) => {
  try {
    const resultFind = await client.findById({ _id: clientId })

    if (!resultFind) {
      return {
        success: false,
        message: 'could not perform the operation',
        details: ["client id doesn't exist."]
      }
    }
    if (await verifyEmailService(clientId, body.email)) {
      throw new ErrorBusinessRule('Este e-mail já está em uso!')
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
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const deleteClientService = async (clientId) => {
  try {
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
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listLikesClientProviderService = async (clientId) => {
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
      data: toDTOListProviderLike(...resultLikeDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createLikeClientProviderService = async (providerId, clientId) => {
  try {
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
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const removeLikeClientProviderService = async (providerId, clientId) => {
  try {
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
