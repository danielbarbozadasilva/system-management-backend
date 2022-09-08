const { user } = require('../models/models.index')
const cryptography = require('../utils/utils.cryptography')
const userMapper = require('../mappers/mappers.user')
const ErrorGeneric = require('../utils/errors/erros.generic-error')
const ErrorNotAuthorized = require('../utils/errors/errors.user-not-authorized')
const ErrorNotAuthenticated = require('../utils/errors/errors.user-not-authenticated')

const profile = [
  {
    type: 1,
    description: 'admin',
    permission: [
      'UPDATE_PROVIDER',
      'REMOVE_PROVIDER',
      'CHANGE_STATUS_PROVIDER',
      'CREATE_CATEGORY',
      'UPDATE_CATEGORY',
      'REMOVE_CATEGORY'
    ]
  },
  {
    type: 2,
    description: 'provider',
    permission: [
      'SEARCH_PRODUCT',
      'CREATE_PRODUCT',
      'REMOVE_PRODUCT',
      'UPDATE_PRODUCT',
      'CREATE_LIKE_PRODUCT',
      'REMOVE_LIKE_PRODUCT'
    ]
  },
  {
    type: 3,
    description: 'client',
    permission: ['CLIENT_LIKE_CREATE', 'CLIENT_LIKE_REMOVE']
  }
]

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
    .find({ email })
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
    throw new ErrorNotAuthenticated('Cpf ou senha inválidos!')
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

const verifyStatusProviderService = async (id) => {
  const result = await user.find({
    _id: id,
    kind: 'provider',
    status: 'ANALYSIS'
  })

  if (result.length === 0) {
    return false
  }
  return true
}

module.exports = {
  authenticateService,
  verifyStatusProviderService,
  checkPermissionService,
  createCredentialService,
  userIsValidService
}
