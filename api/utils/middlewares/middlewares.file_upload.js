const formidable = require('formidable')
const fileUtils = require('../utils.file')
const ErrorBusinessRule = require('../errors/errors.business_rule')

const fileUpload = (destiny) => async (req, res, next) => {
  const form = formidable.IncomingForm()
  form.uploadDir = fileUtils.UtilCreateAddress('temp')

  const formfields = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }

      resolve({
        ...fields,
        files
      })
    })
  })

  const { files, ...fields } = formfields

  req.body = {
    ...fields
  }

  if (req.method === 'POST') {
    if (!files.image || files.image.name === '') {
      throw new ErrorBusinessRule('"image" é de preenchimento obrigatório.')
    }
  }

  if (files.image && files.image.name !== '') {
    const newName = fileUtils.UtilCreateName(files.image.type)
    const newPath = fileUtils.UtilCreateAddress(destiny, newName)

    req.body.image = {
      type: files.image.type,
      origin: files.image.name,
      oldPath: files.image.path,
      newName,
      newPath
    }
  }

  next()
}

module.exports = fileUpload
