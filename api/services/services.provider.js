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
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllProviderService = async (filter) => {
  try {
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
        $sort: { [`${filter}`]: -1 }
      }
    ])

    return {
      success: true,
      message: 'Operation performed successfully!',
      data: resultDB.map((item) => toItemListDTO(item))
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
    const resultDB = await provider.find({ uf, city })

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
  try {
    let data = {}

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

    if (body.auth) {
      data = await serviceUserProvider.createCredentialService(body.email)
    }

    return {
      success: true,
      message: 'Operation performed successfully',
      data: data?.token ? data : toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateProviderService = async (providerId, body) => {
  try {
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
    await product.deleteMany({ provider: providerId })
    await provider.deleteOne({ _id: providerId })

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
          name: providerDB.fantasyName,
          status
        }
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
    await provider.findByIdAndUpdate(providerId, {
      $push: { likes: productId }
    })

    return {
      success: true,
      message: 'Successfully liked!'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const removeLikeProviderProductService = async (providerId, productId) => {
  try {
    await provider.updateOne(
      { _id: ObjectId(`${providerId}`) },
      { $pull: { likes: `${productId}` } }
    )

    return {
      success: true,
      message: 'like removed successfully!'
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
