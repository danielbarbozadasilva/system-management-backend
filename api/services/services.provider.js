const { ObjectId } = require('mongodb')
const { provider, product, client, like } = require('../models/models.index')

const serviceUserProvider = require('./services.user')
const emailUtils = require('../utils/utils.email')
const { UtilCreateHash } = require('../utils/utils.cryptography')
const { toItemListDTO, toDTO } = require('../mappers/mappers.provider')
const { EmailEnable } = require('../utils/utils.email.message.enable')
const { EmailDisable } = require('../utils/utils.email.message.disable')

const listAllProviderService = async (nameFilter) => {
  let filter = {}

  if (Object.values(nameFilter) == 'alphabetical') {
    filter = { fantasyName: 1 }
  } else if (Object.values(nameFilter) == 'like') {
    filter = { count: -1 }
  } else {
    filter = { fantasyName: -1 }
  }

  const resultDB = await provider.aggregate([
    {
      $lookup: {
        from: like.collection.name,
        localField: '_id',
        foreignField: 'provider',
        as: 'result_like'
      }
    },
    {
      $unwind: {
        path: '$result_like',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: product.collection.name,
        localField: 'result_like.product',
        foreignField: '_id',
        as: 'result_product'
      }
    },
    {
      $unwind: {
        path: '$result_product',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $match: {
        'result_like.product': {
          $exists: true,
          $ne: null
        }
      }
    },
    {
      $group: {
        _id: '$result_like.product',
        _id: '$_id',
        data: { $push: '$$ROOT' },
        count: { $sum: 1 }
      }
    },
    { $sort: filter }
  ])

  if (resultDB.length < 1) {
    return {
      success: false,
      details: 'No likes found!'
    }
  }
  if (resultDB.length > 0) {
    return {
      success: true,
      message: 'Operation performed successfully!',
      data: resultDB
    }
  }
}

const listProviderByIdService = async (filterId) => {
  const resultDB = await provider.aggregate([
    { $match: { _id: ObjectId(filterId) } },

    {
      $lookup: {
        from: like.collection.name,
        localField: '_id',
        foreignField: 'provider',
        as: 'result_like'
      }
    },
    {
      $unwind: {
        path: '$result_like',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: client.collection.name,
        localField: 'result_like.client',
        foreignField: '_id',
        as: 'result_client'
      }
    },
    {
      $unwind: {
        path: '$client',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: client.collection.name,
        localField: 'result_like.client',
        foreignField: '_id',
        as: 'result_client'
      }
    },
    {
      $unwind: {
        path: '$result_client',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: product.collection.name,
        localField: 'result_like.product',
        foreignField: '_id',
        as: 'result_product'
      }
    },
    {
      $unwind: {
        path: '$result_product',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: '$result_like.client',
        _id: '$_id',

        data: { $push: '$$ROOT' },
        count: { $sum: 1 }
      }
    }
  ])
  if (!resultDB.length) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['The supplier does not exist']
    }
  }

  return {
    success: true,
    message: 'operation performed successfully',
    data: resultDB
  }
}

const listProductsProviderService = async (providerId) => {
  const resultDB = await product
    .find({ provider: providerId })
    .populate('provider')

  if (!resultDB.length > 0) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['The value does not exist']
    }
  }
  return {
    success: true,
    message: 'Operation performed successfully',
    data: resultDB.map((item) => toItemListDTO(item))
  }
}

const listProvidersByLocationService = async (uf, city) => {
  let filter = {}
  if (city == 'undefined' || city == 'x') {
    filter = { uf }
  } else {
    filter = { uf, city }
  }

  const resultDB = await provider.find(filter)
  if (!resultDB) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['The value does not exist']
    }
  }

  return {
    success: true,
    message: 'operation performed successfully',
    data: resultDB
  }
}

const createProviderService = async (model) => {
  const {
    cnpj,
    fantasyName,
    socialName,
    address,
    uf,
    city,
    responsible,
    phone,
    email,
    password,
    status
  } = model

  if (await serviceUserProvider.verifyCnpjExistsService(cnpj)) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['There is already a registered provider for the entered cnpj']
    }
  }

  if (!(await serviceUserProvider.verifyEmailBodyExistService(email))) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['There is already a registered user for the email entered']
    }
  }

  const resultDB = await provider.create({
    cnpj,
    fantasyName,
    socialName,
    address,
    uf,
    city,
    responsible,
    phone,
    email,
    password: UtilCreateHash(password),
    status: 'ANALYSIS'
  })

  return {
    success: true,
    message: 'Operation performed successfully',
    data: [toDTO(resultDB)]
  }
}

const updateProviderService = async (providerId, body) => {
  const resultFind = await provider
    .findById({ _id: providerId })
    .sort({ fantasyName: 1 })

  if (!resultFind) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ["provider id doesn't exist."]
    }
  }

  if (await serviceUserProvider.verifyCnpjService(providerId, body.cnpj)) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['There is already a registered provider for the entered cnpj']
    }
  }

  if (await serviceUserProvider.verifyEmailService(providerId, body.email)) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['There is already a registered provider for the entered email']
    }
  }
  const newProvider = await provider.updateOne(
    { _id: providerId },
    {
      $set: {
        cnpj: body.cnpj,
        fantasyName: body.fantasyName,
        socialName: body.socialName,
        address: body.address,
        uf: body.uf,
        city: body.city,
        responsible: body.responsible,
        phone: body.phone,
        email: body.email,
        password: UtilCreateHash(body.password)
      }
    }
  )
  if (!newProvider) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['The value does not exist']
    }
  }
  return {
    success: true,
    message: 'Data updated successfully',
    data: {
      ...toDTO(newProvider)
    }
  }
}

const removeProviderService = async (providerId) => {
  const providerDB = await provider.findOne({ _id: providerId })

  if (!providerDB) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ["provider id doesn't exist."]
    }
  }
  const deleteProductDB = await product.deleteMany({ provider: providerId })
  const deleteLikeDB = await like.deleteMany({ _id: providerId })
  const deleteProviderDB = await provider.deleteOne({ _id: providerId })

  if (
    deleteProductDB.ok !== 1 ||
    deleteLikeDB.ok !== 1 ||
    deleteProviderDB.ok !== 1
  ) {
    return {
      success: false,
      details: 'Error deleting provider and products'
    }
  }
  return {
    success: true,
    message: 'Operation performed successfully'
  }
}

const changeStatusService = async (providerId, status) => {
  const providerDB = await provider.findOne({ _id: providerId })

  if (!providerDB) {
    return {
      success: false,
      message: 'operation cannot be performed',
      details: ['There is no provider registered for the provided id provider']
    }
  }

  const resultDB = await provider.updateOne(
    { _id: providerId },
    {
      $set: {
        status
      }
    }
  )

  if (resultDB) {
    if (status === 'ENABLE' || status === 'ANALYSIS') {
      emailUtils.UtilSendEmail({
        to: providerDB.email,
        from: process.env.SENDGRID_SENDER,
        subject: `Activation Confirmation ${providerDB.socialName}`,
        html: EmailEnable('subject', `${process.env.URL}/signin`)
      })
    } else if (status === 'DISABLE') {
      emailUtils.UtilSendEmail({
        to: providerDB.email,
        from: process.env.SENDGRID_SENDER,
        subject: `Inactivation Confirmation ${providerDB.socialName}`,
        html: EmailDisable('subject')
      })
    }
    return {
      success: true,
      message: 'Operation performed successfully'
    }
  }
  if (!resultDB) {
    return {
      success: false,
      message: 'operation cannot be performed'
    }
  }
}

module.exports = {
  listAllProviderService,
  listProviderByIdService,
  listProductsProviderService,
  listProvidersByLocationService,
  createProviderService,
  updateProviderService,
  removeProviderService,
  changeStatusService
}
