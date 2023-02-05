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

const listLikeClientController = async (req, res) => {
  const { clientid } = req.params
  const resultService = await clientService.listLikesClientService(clientid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const createLikeController = async (req, res) => {
  const { providerid, clientid } = req.params
  const resultService = await clientService.createLikeService(
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

const removeLikeController = async (req, res) => {
  const { providerid, clientid } = req.params
  const resultService = await clientService.removeLikeService(
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
  listLikeClientController,
  createLikeController,
  removeLikeController
}
