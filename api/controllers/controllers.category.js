const categoryService = require('../services/services.category')

const listAllCategoryController = async (req, res) => {
  const resultService = await categoryService.searchAllCategoryService()
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listCategoryByIdController = async (req, res) => {
  const { params } = req
  const resultService = await categoryService.searchCategoryByIdService(
    params.categoryid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const createCategoryController = async (req, res) => {
  const { body } = req
  const resultService = await categoryService.addCategoryService(body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateCategoryController = async (req, res) => {
  const { params, body } = req
  const resultService = await categoryService.updateCategoryService(
    params.categoryid,
    body
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const removeCategoryController = async (req, res) => {
  const { params } = req
  const resultService = await categoryService.removeCategoryProductsService(
    params.categoryid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllCategoryController,
  listCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  removeCategoryController
}
