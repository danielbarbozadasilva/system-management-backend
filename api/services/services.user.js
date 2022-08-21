const { user, provider } = require('../models/models.index')
const cryptography = require('../utils/utils.cryptography')
const userMapper = require('../mappers/mappers.user')
const ErrorGeneric = require('../utils/errors/erros.generic_error')
const ErrorAllowedUser = require('../utils/errors/errors.user_not_allowed')

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
    throw new ErrorAllowedUser('Usuário não autorizado!')
  }
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
  return !!resultDB.length > 0
}

const userIsValidService = async (email, password) =>
  !!(await user.findOne({
    email,
    password: cryptography.createHash(password)
  }))

const verifyEmailBodyExistService = async (email) => {
  const users = await user.find({ email })
  return users.length > 0
}

const verifyCnpjExistsService = async (cnpj) => {
  const result = await provider.find({ cnpj })
  return result.length > 0
}

const verifyEmailService = async (id, data) => {
  const result = await provider
    .findOne(Object({ email: data }))
    .where('_id')
    .ne(id)
  return !!result
}

const verifyCnpjService = async (id, data) => {
  const result = await provider
    .findOne(Object({ cnpj: data }))
    .where('_id')
    .ne(id)
  return !!result
}

const authenticateService = async (email, password) => {
  try {
    const resultadoDB = await userIsValidService(email, password)
    if (!resultadoDB) {
      return {
        success: false,
        message: 'Não foi possivel autenticar o usuário',
        details: ['E-mail ou senha inválidos!']
      }
    }

    const resultActive = await userIsActiveService(email)
    if (!resultActive) {
      return {
        success: false,
        message: 'Não foi possivel efetuar o login',
        details: [
          'Sua conta está desativada. Entre em contato com o Administrador!'
        ]
      }
    }

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
  verifyCnpjExistsService,
  verifyEmailBodyExistService,
  userIsValidService,
  verifyEmailService,
  verifyCnpjService
}
