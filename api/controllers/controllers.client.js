const clientService = require('../services/services.client')

const listAllClientsController = async (req, res) => {
  const resultService = await clientService.listAllClientService()
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listClientByIdController = async (req, res) => {
  const { clientid } = req.params
  const resultService = await clientService.listClientByIdService(clientid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const insertClientsController = async (req, res) => {
  const { body } = req
  const resultService = await clientService.createClientService(body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateClientsController = async (req, res) => {
  const { clientid } = req.params
  const { body } = req

  const resultService = await clientService.updateClientService(clientid, body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const deleteClientsController = async (req, res) => {
  const { clientid } = req.params
  const resultService = await clientService.deleteClientService(clientid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listLikeClientController = async (req, res) => {
  const { clientid } = req.params
  const resultService = await clientService.listLikesClientProviderService(
    clientid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const createLikeProviderController = async (req, res) => {
  const { providerid, clientid } = req.params
  const resultService = await clientService.createLikeClientProviderService(
    providerid,
    clientid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const removeLikeProviderController = async (req, res) => {
  const { providerid, clientid } = req.params
  const resultService = await clientService.removeLikeClientProviderService(
    providerid,
    clientid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllClientsController,
  listClientByIdController,
  insertClientsController,
  updateClientsController,
  deleteClientsController,
  listLikeClientController,
  createLikeProviderController,
  removeLikeProviderController
}
