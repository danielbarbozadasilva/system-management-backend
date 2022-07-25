const { category } = require('../../api/models/models.index')
const fileUtils = require('../../api/utils/utils.file')

const createCategory = async () => {
  const resultDB = await category.create(
    {
      _id: Object('615a19fd4384691888d27098'),
      name: 'Bolos',
      description: 'experimente nossos deliciosos bolos...',
      image: {
        origin: 'img01.jpeg',
        name: '76b163b0-742f-4dd4-b916-0e5ffdaae813.jpeg',
        type: 'image/jpg'
      }
    },
    {
      _id: Object('61611e6ff0c5860e72da8757'),
      name: 'Pizzas',
      description: 'experimente nossas deliciosas pizzas...',
      image: {
        origin: 'img02.jpeg',
        name: 'fd2b3f20-2e43-4ffe-8cfe-daa5444c5b86.jpeg',
        type: 'image/jpeg'
      }
    }
  )

  if (resultDB) {
    return {
      success: true,
      message: 'the categories have been successfully added.',
      data: resultDB
    }
  }
  return {
    success: false,
    message: 'error when inserting to categories'
  }
}

const removeCategory = async () => {
  const resultDB = await category.deleteMany({})

  if (resultDB.ok == 1) {
    return {
      success: true,
      message: 'the categories were successfully removed.',
      data: resultDB
    }
  }
  return {
    success: false,
    message: 'it is not possible to remove the categories'
  }
}
module.exports = { createCategory, removeCategory }
