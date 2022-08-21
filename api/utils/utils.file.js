const fs = require('fs')
const uuid = require('uuid').v4
const path = require('path')

const rootAddress = `${__dirname}/file`.replaceAll('\\', '/')
const imageAddress = process.env.IMAGE_PATH

const utilCreateAddress = (destiny, fileName = '') =>
  path.join(rootAddress, destiny, fileName)

const utilCreateAddressDownload = (source, fileName) => {
  const address = path.join(source, fileName).replace('\\', '/')
  return `${imageAddress + address}`
}

const utilCreateName = (type) => {
  const resp = type.split('/')[1]
  return `${uuid()}.${resp}`
}

const utilMove = (oldPath, newPath) => fs.renameSync(oldPath, newPath)

const utilRemove = (source, file) => {
  const fileAddress = utilCreateAddress(source, file)
  if (fs.existsSync(fileAddress)) {
    fs.unlinkSync(fileAddress)
  }
}

module.exports = {
  utilCreateAddress,
  utilCreateAddressDownload,
  utilCreateName,
  utilMove,
  utilRemove
}
