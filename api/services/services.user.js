const { user, provider } = require('../models/models.index')
const cryptography = require('../utils/utils.cryptography')
const userMapper = require('../mappers/mappers.user')
const ErrorGeneric = require('../utils/errors/erros.generic_error')

const profile = [
  {
    id: 1,
    description: 'admin',
    functionality: [
      'UPDATE_PROVIDER',
      'REMOVE_PROVIDER',
      'CHANGE_STATUS_PROVIDER',
      'CREATE_CATEGORY',
      'UPDATE_CATEGORY',
      'REMOVE_CATEGORY'
    ]
  },
  {
    id: 2,
    description: 'provider',
    functionality: [
      'SEARCH_PRODUCT',
      'CREATE_PRODUCT',
      'REMOVE_PRODUCT',
      'UPDATE_PRODUCT',
      'CREATE_LIKE_PRODUCT',
      'REMOVE_LIKE_PRODUCT'
    ]
  },
  {
    id: 3,
    description: 'client',
    functionality: ['CLIENT_LIKE_CREATE', 'CLIENT_LIKE_REMOVE']
  }
]

const searchTypeUserByIdService = (type) =>
  profile.find((item) => item.id === type)

const createCredentialService = async (email) => {
  const userDB = await user.findOne({ email })
  const userDTO = userMapper.toUserDTO(userDB)
  const userToken = cryptography.UtilCreateToken(userDTO)
  if (userDTO && userToken) {
    return {
      token: userToken,
      userDTO
    }
  }
  return false
}

const userIsActiveService = async (email) => {
  const resultDB = await user.find({ email }).where('status').ne('ANALYSIS')
  return !!resultDB.length > 0
}

const userIsValidService = async (email, password) =>
  !!(await user.findOne({
    email,
    password: cryptography.UtilCreateHash(password)
  }))

const verifyFunctionalityProfileService = async (typeUser, test) => {
  const profile = searchTypeUserByIdService(typeUser)
  if (profile?.functionality?.includes(test) == true && profile.id) {
    return false
  }
  return true
}

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
    throw new ErrorGeneric(`Internal Server Error! Código: ${err.name}`)
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
  searchTypeUserByIdService,
  createCredentialService,
  verifyCnpjExistsService,
  verifyEmailBodyExistService,
  verifyFunctionalityProfileService,
  userIsValidService,
  verifyEmailService,
  verifyCnpjService
}
