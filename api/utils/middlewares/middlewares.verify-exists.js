const { ObjectId } = require('mongodb')
const {
  provider,
  product,
  client,
  category,
  user
} = require('../../models/models.index')
const ErrorUnprocessableEntity = require('../errors/errors.unprocessable-entity')
const ErrorBusinessRule = require('../errors/errors.business-rule')

const verifyIdCategoryDbMiddleware = async (req, res, next) => {
  const categoryDB = await category.findOne({ _id: req.params.categoryid })
  if (!categoryDB) {
    throw new ErrorUnprocessableEntity(`Não existe uma categoria com esse id!`)
  }
  next()
}

const verifyIdProductDbMiddleware = async (req, res, next) => {
  const productDB = await product.findOne({ _id: req.params.productid })
  if (!productDB) {
    throw new ErrorUnprocessableEntity(`Não existe um produto com esse id!`)
  }
  next()
}

const verifyIdProviderDbMiddleware = async (req, res, next) => {
  const providerDB = await provider.findOne({ _id: req.params.providerid })
  if (!providerDB) {
    throw new ErrorUnprocessableEntity(`Não existe um fornecedor com esse id!`)
  }
  next()
}

const verifyIdClientDbMiddleware = async (req, res, next) => {
  const clientDB = await client.findOne({ _id: req.params.clientid })
  if (!clientDB) {
    throw new ErrorUnprocessableEntity(`Não existe um cliente com esse id!`)
  }
  next()
}

const verifyLikeClientDbMiddleware = async (req, res, next) => {
  const [likeDB, resultLike] = await Promise.all([
    client.aggregate([
      { $match: { _id: ObjectId(req.params.clientid) } },
      {
        $lookup: {
          from: provider.collection.name,
          localField: 'likes',
          foreignField: '_id',
          as: 'likes'
        }
      }
    ]),
    client.find({
      _id: `${req.params.clientid}`,
      likes: `${req.params.providerid}`
    })
  ])

  if (likeDB[0].likes.length >= 3) {
    throw new ErrorBusinessRule(
      'O cliente não pode curtir mais de três fornecedores!'
    )
  }

  if (resultLike.length !== 0) {
    throw new ErrorBusinessRule('O cliente já curtiu esse fornecedor!')
  }
  next()
}

const verifyLikeProviderDbMiddleware = async (req, res, next) => {
  const [likeDB, likeProviderDB] = await Promise.all([
    provider.aggregate([
      { $match: { _id: ObjectId(req.params.providerid) } },
      {
        $lookup: {
          from: product.collection.name,
          localField: 'likes',
          foreignField: '_id',
          as: 'likes'
        }
      }
    ]),
    provider.find({
      _id: `${req.params.providerid}`,
      likes: `${req.params.productid}`
    })
  ])

  if (likeDB[0].likes.length >= 3) {
    throw new ErrorBusinessRule(
      'O fornecedor não pode curtir mais de 3 produtos!'
    )
  }

  if (likeProviderDB.length > 0) {
    throw new ErrorBusinessRule('O fornecedor já curtiu este produto!')
  }
  next()
}

const verifyEmailExists = async (req, res, next) => {
  const resultEmail = await user.find({ email: req.body.email })
  if (resultEmail !== null) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  next()
}

const verifyCnpjExists = async (req, res, next) => {
  const resultCnpj = await user.find({ cnpj: req.body.cnpj })
  if (resultCnpj !== null) {
    throw new ErrorBusinessRule('Este cnpj já está em uso!')
  }
  next()
}

const verifyEmailBodyExists = async (req, res, next) => {
  const resultEmail = await user
    .findOne(Object({ email: req.body.email }))
    .where('_id')
    .ne(req.params.id)
  if (resultEmail !== null) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  next()
}

const verifyCnpjBodyExists = async (req, res, next) => {
  const resultCnpj = await user
    .findOne(Object({ cnpj: req.body.cnpj }))
    .where('_id')
    .ne(req.params.id)
  if (resultCnpj !== null) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  next()
}

module.exports = {
  verifyIdCategoryDbMiddleware,
  verifyIdProductDbMiddleware,
  verifyIdProviderDbMiddleware,
  verifyIdClientDbMiddleware,
  verifyLikeClientDbMiddleware,
  verifyLikeProviderDbMiddleware,
  verifyEmailExists,
  verifyCnpjExists,
  verifyEmailBodyExists,
  verifyCnpjBodyExists
}
