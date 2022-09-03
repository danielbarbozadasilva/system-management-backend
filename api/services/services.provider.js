const { ObjectId } = require('mongodb')
const {
  provider,
  product,
  client,
  category
} = require('../models/models.index')
const serviceUserProvider = require('./services.user')
const emailUtils = require('../utils/utils.email')
const { createHash } = require('../utils/utils.cryptography')
const { toItemListDTO, toDTO } = require('../mappers/mappers.provider')
const mapperProduct = require('../mappers/mappers.product')
const { EmailEnable } = require('../utils/utils.email.message.enable')
const { EmailDisable } = require('../utils/utils.email.message.disable')
const { toDTOLikeLength } = require('../mappers/mappers.client')
const ErrorBusinessRule = require('../utils/errors/errors.business-rule')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllProviderService = async (nameFilter) => {
  try {
    let filter = {}

    if (Object.values(nameFilter) == 'alphabetical') {
      filter = { fantasyName: 1 }
    } else if (Object.values(nameFilter) == 'like') {
      filter = { result_likes: -1 }
    } else {
      filter = { fantasyName: -1 }
    }

    const resultDB = await provider.aggregate([
      {
        $lookup: {
          from: product.collection.name,
          localField: '_id',
          foreignField: 'provider',
          as: 'result_products'
        }
      },
      {
        $lookup: {
          from: product.collection.name,
          localField: 'likes',
          foreignField: '_id',
          as: 'result_likes'
        }
      },
      {
        $lookup: {
          from: client.collection.name,
          localField: '_id',
          foreignField: 'likes',
          as: 'result_client'
        }
      },
      {
        $sort: filter
      }
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
        data: resultDB.map((item) => toItemListDTO(item))
      }
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listProductsProviderService = async (providerId) => {
  try {
    const resultDB = await product.aggregate([
      { $match: { provider: ObjectId(providerId) } },
      {
        $lookup: {
          from: provider.collection.name,
          localField: 'provider',
          foreignField: '_id',
          as: 'provider'
        }
      },
      {
        $lookup: {
          from: category.collection.name,
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      }
    ])

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.map((item) => mapperProduct.toDTOLikeProductList(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listProvidersByLocationService = async (uf, city) => {
  try {
    let filter = {}
    if (city == 'undefined' || city == 'x') {
      filter = { uf }
    } else {
      filter = { uf, city }
    }
    if (uf == 'x' && city == 'x') {
      filter = {}
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
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createProviderService = async (body) => {
  if (await serviceUserProvider.verifyCnpjExistsService(body.cnpj)) {
    throw new ErrorBusinessRule('Este cnpj já está em uso!')
  }

  if (await serviceUserProvider.verifyEmailBodyExistService(body.email)) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  try {
    const resultDB = await provider.create({
      cnpj: body.cnpj,
      fantasyName: body.fantasyName,
      socialName: body.socialName,
      address: body.address,
      uf: body.uf,
      city: body.city,
      responsible: body.responsible,
      phone: body.phone,
      email: body.email,
      password: createHash(body.password),
      status: 'ANALYSIS'
    })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateProviderService = async (providerId, body) => {
  try {
    const resultFind = await provider.findById({ _id: providerId })

    if (!resultFind) {
      return {
        success: false,
        message: 'could not perform the operation',
        details: ["provider id doesn't exist."]
      }
    }

    if (await serviceUserProvider.verifyCnpjService(providerId, body.cnpj)) {
      throw new ErrorBusinessRule('Este cnpj já está em uso!')
    }

    if (await serviceUserProvider.verifyEmailService(providerId, body.email)) {
      throw new ErrorBusinessRule('Este e-mail já está em uso!')
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
          password: createHash(body.password)
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
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const removeProviderService = async (providerId) => {
  try {
    const providerDB = await provider.findOne({ _id: providerId })

    if (!providerDB) {
      return {
        success: false,
        message: 'could not perform the operation',
        details: ["provider id doesn't exist."]
      }
    }
    const deleteProductDB = await product.deleteMany({ provider: providerId })
    const deleteProviderDB = await provider.deleteOne({ _id: providerId })

    if (deleteProductDB.ok !== 1 || deleteProviderDB.ok !== 1) {
      return {
        success: false,
        details: 'Error deleting provider and products'
      }
    }
    return {
      success: true,
      message: 'Operation performed successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const changeStatusService = async (providerId, status) => {
  try {
    const providerDB = await provider.findOne({ _id: providerId })
    if (!providerDB) {
      return {
        success: false,
        message: 'operation cannot be performed',
        details: [
          'There is no provider registered for the provided id provider'
        ]
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
        emailUtils.utilSendEmail({
          to: providerDB.email,
          from: process.env.SENDGRID_SENDER,
          subject: `Activation Confirmation ${providerDB.socialName}`,
          html: EmailEnable('subject', `${process.env.URL}/signin`)
        })
      } else if (status === 'DISABLE') {
        emailUtils.utilSendEmail({
          to: providerDB.email,
          from: process.env.SENDGRID_SENDER,
          subject: `Inactivation Confirmation ${providerDB.socialName}`,
          html: EmailDisable('subject')
        })
      }
      return {
        success: true,
        message: 'Operation performed successfully',
        data: {
          id: providerDB._id,
          name: providerDB.fantasyName,
          status
        }
      }
    }
    if (!resultDB) {
      return {
        success: false,
        message: 'operation cannot be performed'
      }
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listLikesProviderProductService = async (providerId) => {
  try {
    const resultDB = await provider.aggregate([
      { $match: { _id: ObjectId(providerId) } },
      {
        $lookup: {
          from: product.collection.name,
          localField: 'likes',
          foreignField: '_id',
          as: 'result_likes'
        }
      }
    ])

    return {
      success: true,
      message: 'Operation performed successfully!',
      data: toItemListDTO(...resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createLikeProviderProductService = async (providerId, productId) => {
  try {
    const [providerDB, productDB, likeDB, likeProviderDB] = await Promise.all([
      provider.findById(providerId),
      product.findById(productId),
      provider.aggregate([
        { $match: { _id: ObjectId(providerId) } },
        {
          $lookup: {
            from: product.collection.name,
            localField: 'likes',
            foreignField: '_id',
            as: 'likes'
          }
        }
      ]),
      provider.find({ _id: `${providerId}`, likes: `${productId}` })
    ])

    if (!providerDB) {
      return {
        success: false,
        details: 'O fornecedor informado não existe!'
      }
    }

    if (!productDB) {
      return {
        success: false,
        details: 'O produto informado não existe!'
      }
    }

    if (toDTOLikeLength(...likeDB) >= 3) {
      return {
        success: false,
        details: 'O fornecedor não pode curtir mais de 3 produtos!'
      }
    }

    if (likeProviderDB.length > 0) {
      return {
        success: false,
        details: 'O fornecedor já curtiu este produto!'
      }
    }

    const resultLike = await provider.findByIdAndUpdate(providerId, {
      $push: { likes: productId }
    })

    if (resultLike) {
      return {
        success: true,
        message: 'Successfully liked!',
        data: {
          provider: resultLike._id,
          product: productId
        }
      }
    }

    return {
      success: false,
      details: 'There is no like!'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const removeLikeProviderProductService = async (providerId, productId) => {
  try {
    const [providerDB, productDB, likeDB] = await Promise.all([
      provider.findById(providerId),
      product.findById(productId),
      provider.find({ _id: `${providerId}`, likes: `${productId}` })
    ])

    if (!providerDB) {
      return {
        success: false,
        details: 'The provider informed does not exist!'
      }
    }

    if (!productDB) {
      return {
        success: false,
        details: 'The product informed does not exist!'
      }
    }

    if (likeDB) {
      const resultLike = await provider.updateOne(
        { _id: ObjectId(`${providerId}`) },
        { $pull: { likes: `${productId}` } }
      )

      if (resultLike) {
        return {
          success: true,
          data: {
            message: 'like removed successfully!'
          }
        }
      }

      return {
        success: false,
        details: 'There is no like!'
      }
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllProviderService,
  listProductsProviderService,
  listProvidersByLocationService,
  createProviderService,
  updateProviderService,
  removeProviderService,
  changeStatusService,
  listLikesProviderProductService,
  createLikeProviderProductService,
  removeLikeProviderProductService
}
