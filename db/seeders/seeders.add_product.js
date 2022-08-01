const { product } = require('../../api/models/models.index')

const createProduct = async () => {
  const resultDB = await product.create(
    {
      _id: Object('6164ecf0912afe7ae51bf6a7'),
      category: Object('615a19fd4384691888d27098'),
      provider: Object('615a584a79b274425a6fa7db'),
      name: 'Bolo de Chocolate',
      description: 'Um bolo delicioso de chocolate...',
      price: 13.55,
      image: {
        origin: 'img03.jpeg',
        name: 'd5b699f0-c303-438b-9d08-5abc5849124d.jpeg',
        type: 'image/jpeg'
      }
    },
    {
      _id: Object('6164ecf0912afe7ae51bf6a8'),
      category: Object('61611e6ff0c5860e72da8757'),
      provider: Object('615a584a79b274425a6fa7dc'),
      name: 'Pizza de Calabresa',
      description: 'Uma deliciosa pizza de calabresa...',
      price: 20.95,
      image: {
        origin: 'img04.jpeg',
        name: 'ee659763-1406-442f-a03b-8ecb8e443145.jpeg',
        type: 'image/jpeg'
      }
    }
  )
  if (resultDB) {
    return {
      success: true,
      message: 'the products have been successfully added.',
      data: resultDB
    }
  }
  return {
    success: false,
    message: 'it is not possible to add the products'
  }
}

const removeProduct = async () => {
  const resultDB = await product.deleteMany({})

  if (resultDB.ok == 1) {
    return {
      success: true,
      message: 'the products were successfully removed.'
    }
  }
}

module.exports = { createProduct, removeProduct }
