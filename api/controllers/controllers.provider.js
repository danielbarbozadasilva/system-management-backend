const providerService = require('../services/services.provider')
const likeService = require('../services/services.like')

const listAllProvidersController = async (req, res) => {
  const { like, alphabetical } = req.params

  const resultService = await providerService.listAllProviderService(
    like,
    alphabetical
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listProviderByIdController = async (req, res) => {
  const { providerid } = req.params
  const resultService = await providerService.listProviderByIdService(
    providerid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listProvidersByLocationController = async (req, res) => {
  const { uf, city } = req.params
  const resultService = await providerService.listProvidersByLocationService(
    uf,
    city
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const insertProviderController = async (req, res) => {
  const { body } = req
  const resultService = await providerService.createProviderService(body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateProviderController = async (req, res) => {
  const { body } = req
  const { providerid } = req.params
  const resultService = await providerService.updateProviderService(
    providerid,
    body
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const removeProviderController = async (req, res) => {
  const { providerid } = req.params
  const resultService = await providerService.updateProviderService(providerid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listProductsByProviderController = async (req, res) => {
  const { providerid } = req.params
  const resultService = await providerService.listProductsProviderService(
    providerid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const changeStatusProviderController = async (req, res) => {
  const { providerid, status } = req.params
  const resultService = await providerService.changeStatusService(
    providerid,
    status
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const searchLikeProductController = async (req, res) => {
  const { providerid } = req.params

  const resultService = await likeService.listLikesProviderProductService(
    providerid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const insertLikeProductController = async (req, res) => {
  const { providerid, productid } = req.params
  const resultService = await likeService.createLikeProviderProductService(
    providerid,
    productid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const deleteLikeProductController = async (req, res) => {
  const { params } = req
  const resultService = await likeService.removeLikeProviderProductService(
    params.providerid,
    params.productid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllProvidersController,
  listProviderByIdController,
  listProvidersByLocationController,
  insertProviderController,
  updateProviderController,
  removeProviderController,
  listProductsByProviderController,
  changeStatusProviderController,
  searchLikeProductController,
  insertLikeProductController,
  deleteLikeProductController
}
