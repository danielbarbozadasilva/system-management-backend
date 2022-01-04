const { user, provider } = require('../models/models.index')
const cryptography = require('../utils/utils.cryptography')
const userMapper = require('../mappers/mappers.user')

const profile = [
  {
    id: 1,
    description: 'admin',
    functionality: [
      'ADD_PROVIDER',
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
      'UPDATE_PRODUCT',
      'REMOVE_PRODUCT',
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

const searchTypeUserByIdService = (type) => {
  return profile.find((item) => {
    return item.id === type ? true : false
  })
}

const createCredentialService = async (email) => {
  const userDB = await user.findOne({ email: email })
  const userDTO = userMapper.toUserDTO(userDB)
  const userToken = cryptography.UtilCreateToken(userDTO)
  if (userDTO && userToken) {
    return {
      token: userToken,
      userDTO
    }
  } else {
    return false
  }
}

const verifyFunctionalityProfileService = async (typeUser, test) => {
  const profile = searchTypeUserByIdService(typeUser)
  if (
    profile?.functionality?.includes(test) == true && profile.id ? true : false
  ) {
    return false
  } else {
    return true
  }
}

const verifyEmailBodyExistService = async (email) => {
  const users = await user.find({ email })
  return users.length > 0 ? false : true
}

const verifyCnpjExistsService = async (cnpj) => {
  const result = await provider.find({ cnpj })
  return result.length > 0 ? true : false
}

const verifyEmailService = async (id, data) => {
  const result = await provider
    .findOne(Object({ email: data }))
    .where('_id')
    .ne(id)
  return result ? true : false
}

const verifyCnpjService = async (id, data) => {
  const result = await provider
    .findOne(Object({ cnpj: data }))
    .where('_id')
    .ne(id)
  return result ? true : false
}

const authenticateService = async (email, password) => {
  const resultadoDB = await userIsValidService(email, password)
  if (!resultadoDB) {
    return {
      success: false,
      message: 'Unable to authenticate user',
      details: ['Invalid username or password']
    }
  }
  const resCreateCredential = await createCredentialService(email)
  if (!resCreateCredential) {
    return {
      success: false,
      details: ['it was not possible to create the credential']
    }
  }
  return {
    success: true,
    message: 'Successfully authenticated user',
    data: resCreateCredential
  }
}

const verifyStatusProviderService = async (id) => {
  const result = await user.find({
    _id: id,
    kind: 'provider',
    status: 'ANALYSIS'
  });

  if (result.length === 0) {
    return false
  } else {
    return true
  }
}

const userIsValidService = async (email, password) => {
  return (await user.findOne({
    email: email, password: cryptography.UtilCreateHash(password)
  })) ? true : false
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
