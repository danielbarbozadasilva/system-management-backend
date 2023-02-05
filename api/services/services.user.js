const { user } = require('../models/models.index')
const cryptography = require('../utils/utils.cryptography')
const userMapper = require('../mappers/mappers.user')
const ErrorGeneric = require('../exceptions/erros.generic-error')
const ErrorNotAuthorized = require('../exceptions/errors.user-not-authorized')
const ErrorNotAuthenticated = require('../exceptions/errors.user-not-authenticated')
const profile = require('../utils/utils.rules')

const checkPermissionService = (type, permission) => {
  const result = profile.find((item) => item.type === type)
  const check = result?.permission?.includes(permission)
  if (!check) {
    throw new ErrorNotAuthorized('Usuário não autorizado!')
  }
  return !!check
}

const createCredentialService = async (email) => {
  const userDB = await user.findOne({ email })
  const userDTO = userMapper.toUserDTO(userDB)
  const userToken = cryptography.createToken(userDTO)
  if (userDTO && userToken) {
    return {
      token: userToken,
      userDTO
    }
  }
  return false
}

const userIsActiveService = async (email) => {
  const resultDB = await user
    .findOne({ email })
    .where('status')
    .nin(['ANALYSIS', 'DISABLE'])

  if (!resultDB) {
    throw new ErrorNotAuthorized('Sua conta foi desativada pelo Administrador!')
  }
  return !!resultDB
}

const userIsValidService = async (email, password) => {
  const userDB = await user.findOne({
    email,
    password: cryptography.createHash(password)
  })

  if (!userDB) {
    throw new ErrorNotAuthenticated('E-mail ou senha inválidos!')
  }
  return !!userDB
}

const authenticateService = async (email, password) => {
  await userIsValidService(email, password)
  await userIsActiveService(email)
  try {
    const resultCredentials = await createCredentialService(email)
    if (!resultCredentials) {
      return {
        success: false,
        details: ['Não foi possivel criar a credencial!']
      }
    }

    return {
      success: true,
      message: 'Usuário autenticado com sucesso!',
      data: resultCredentials
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const checkIdAuthorizationService = (idToken, idUser, type) => {
  let authorized = false

  if (idUser && type !== 1) {
    authorized = idUser != idToken

    if (authorized) {
      throw new ErrorNotAuthorized(
        "Usuário não autorizado! Você só pode realizar a operação usando o seu próprio 'Id'"
      )
    }
  }
  return authorized
}

module.exports = {
  authenticateService,
  checkPermissionService,
  createCredentialService,
  userIsValidService,
  checkIdAuthorizationService
}
