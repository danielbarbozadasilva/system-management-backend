const { ObjectId } = require('mongodb')
const {
  provider,
  product,
  client,
  category
} = require('../models/models.index')
const emailUtils = require('../utils/utils.email')
const mapperProvider = require('../mappers/mappers.provider')
const { createHash } = require('../utils/utils.cryptography')
const { EmailEnable } = require('../utils/utils.email.message.enable')
const { EmailDisable } = require('../utils/utils.email.message.disable')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllProviderService = async (filter) => {
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
        as: 'likes'
      }
    },
    {
      $lookup: {
        from: client.collection.name,
        localField: '_id',
        foreignField: 'likes',
        as: 'clients'
      }
    },
    {
      $sort: { [`${filter}`]: 1 }
    }
  ])

  return {
    success: true,
    message: 'Operation performed successfully!',
    data: resultDB.map((item) => mapperProvider.toItemListDTO(item))
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
      data: resultDB.map((item) => mapperProvider.toDTOLikeList(item))
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
      data: mapperProvider.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const sendEmailService = async (status, name, email) => {
  if (status === 'ENABLE') {
    emailUtils.utilSendEmail({
      to: email,
      from: process.env.SENDGRID_SENDER,
      subject: `Activation Confirmation ${name}`,
      html: EmailEnable('subject', `${process.env.URL}/signin`)
    })
  } else if (status === 'DISABLE') {
    emailUtils.utilSendEmail({
      to: email,
      from: process.env.SENDGRID_SENDER,
      subject: `Inactivation Confirmation ${name}`,
      html: EmailDisable('subject')
    })
  }
}

const changeStatusService = async (providerId, status) => {
  try {
    const result = await provider.findOneAndUpdate(
      { _id: providerId },
      {
        $set: { status }
      }
    )

    await sendEmailService(status, result.fantasyName, result.email)

    return {
      success: true,
      message: 'Operation performed successfully',
      data: {
        name: result.fantasyName,
        status
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
          as: 'likes'
        }
      }
    ])

    return {
      success: true,
      message: 'Operation performed successfully!',
      data: mapperProvider.toItemListDTO(...resultDB)
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
  changeStatusService,
  listLikesProviderProductService,
  createLikeProviderProductService,
  removeLikeProviderProductService
}
