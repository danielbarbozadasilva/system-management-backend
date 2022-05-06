const productService = require('../services/services.product')

const filterProductController = async (req, res) => {
  const { name, filter } = req.params
  const resultService = await productService.listProductWithFilterService(name, filter)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listAllProductsController = async (req, res) => {
  const resultService = await productService.listAllProductService()
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listProductByIdController = async (req, res) => {
  const { productid } = req.params
  const resultService = await productService.listProductByIdService(productid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const insertProductController = async (req, res) => {
  const { body } = req
  const { providerid } = req.params
  const resultService = await productService.createProductService(
    body,
    providerid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateProductController = async (req, res) => {
  const { params, body } = req
  const resultService = await productService.updateProductService(
    params.productid,
    body
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const removeProductController = async (req, res) => {
  const { productid } = req.params
  const resultService = await productService.deleteProductService({
    productId: productid
  })
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  filterProductController,
  listAllProductsController,
  listProductByIdController,
  insertProductController,
  updateProductController,
  removeProductController
}
