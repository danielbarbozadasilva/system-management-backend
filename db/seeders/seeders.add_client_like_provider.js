const { like } = require('../../api/models/models.index')

const dataLike = [
  {
    client: '615a19fd4384691888d27098',
    provider: '615a584a79b274425a6fa7db'
  },
  {
    client: '615cce324b51ba2b14c1b170',
    provider: '615a584a79b274425a6fa7db'
  }
]

const createLike = async () => {
  const resultDB = await like.create(dataLike)
  if (resultDB) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB
    }
  }
  return {
    success: false,
    message: 'could not perform the operation'
  }
}
module.exports = { createLike }
