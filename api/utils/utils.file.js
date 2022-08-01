const fs = require('fs')
const uuid = require('uuid').v4
const path = require('path')

const rootAddress = `${__dirname}/file`.replaceAll('\\', '/')
const imageAddress = process.env.IMAGE_PATH

const UtilCreateAddress = (destiny, fileName = '') =>
  path.join(rootAddress, destiny, fileName)

const UtilCreateAddressDownload = (source, fileName) => {
  const address = path.join(source, fileName).replace('\\', '/')
  return `${imageAddress + address}`
}

const UtilCreateName = (type) => {
  const resp = type.split('/')[1]
  return `${uuid()}.${resp}`
}

const UtilMove = (oldPath, newPath) => fs.renameSync(oldPath, newPath)

const UtilRemove = (source, file) => {
  const fileAddress = UtilCreateAddress(source, file)
  if (fs.existsSync(fileAddress)) {
    fs.unlinkSync(fileAddress)
  }
}

module.exports = {
  UtilCreateAddress,
  UtilCreateAddressDownload,
  UtilCreateName,
  UtilMove,
  UtilRemove
}
