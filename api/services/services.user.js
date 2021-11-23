const { user, provider } = require('../models/models.index');
const cryptography = require('../utils/utils.cryptography');
const userMapper = require('../mappers/mappers.user');

const profile = [
  {
    id: 1,
    description: 'ADMIN',
    functionality: [
      'SEARCH_PROVIDER',
      'SEARCH_PROVIDER_ID',
      'ADD_PROVIDER',
      'UPDATE_PROVIDER',
      'DELETE_PROVIDER',
      'CHANGE_STATUS_PROVIDER',
      'SEARCH_CATEGORY',
      'CREATE_CATEGORY',
      'UPDATE_CATEGORY',
      'REMOVE_CATEGORY',
      'SEARCH_CLIENT',
    ],
  },
  {
    id: 2,
    description: 'PROVIDER',
    functionality: [
      'SEARCH_PROVIDER_ID',
      'SEARCH_PRODUCT',
      'CREATE_PRODUCT',
      'UPDATE_PRODUCT',
      'REMOVE_PRODUCT',
      'SEARCH_CLIENT_ID',
      'CREATE_LIKE_PRODUCT',
      'REMOVE_LIKE_PRODUCT',
    ],
  },
  {
    id: 3,
    description: 'CLIENT',
    functionality: [
      'LIKE_CREATE',
      'LIKE_REMOVE',
      'SEARCH_PROVIDER_ID',
      'SEARCH_CLIENT',
      'SEARCH_CLIENT_ID',
    ],
  },
];

const ServiceSearchTypeUserById = (type) => {
  return profile.find((item) => {
    return item.id === type ? true : false;
  });
};

const ServiceCreateCredential = async (email) => {
  const userDB = await user.findOne({
    email: email,
  });
  const userDTO = userMapper.toUserDTO(userDB);
  return {
    token: cryptography.UtilCreateToken(userDTO),
    userDTO,
  };
};

const ServiceVerifyFunctionalityProfile = (profile_id, functionality) => {
  const profile = ServiceSearchTypeUserById(profile_id);
  return profile?.functionality?.includes(functionality);
};

const ServiceVerifyEmailExists = async (email) => {
  const users = await user.find({ email });
  return users.length > 0 ? true : false;
};

const ServiceVerifyCnpjExists = async (cnpj) => {
  const result = await provider.find({ cnpj });
  return result.length > 0 ? true : false;
};

const ServiceVerifyEmail = async (id, date) => {
  const result = await provider
    .findOne(Object({ email: date }))
    .where('_id')
    .ne(id);
  return result ? true : false;
};

const ServiceVerifyCnpj = async (id, date) => {
  const result = await provider
    .findOne(Object({ cnpj: date }))
    .where('_id')
    .ne(id);
  return result ? true : false;
};

const ServiceAuthenticate = async (email, password) => {
  const resultadoDB = await ServiceUserIsValid(email, password);
  console.log(!resultadoDB ? resultadoDB : email);
  if (!resultadoDB) {
    return {
      success: false,
      message: 'Unable to authenticate user',
      details: ['Invalid username or password'],
    };
  }

  return {
    success: true,
    message: 'Successfully authenticated user',
    data: await ServiceCreateCredential(email),
  };
};

const ServiceUserIsValid = async (email, password) => {
  return (await user.findOne({
    email,
    password: cryptography.UtilCreateHash(password),
  }))
    ? true
    : false;
};

module.exports = {
  ServiceAuthenticate,
  ServiceSearchTypeUserById,
  ServiceCreateCredential,
  ServiceVerifyCnpjExists,
  ServiceVerifyEmailExists,
  ServiceVerifyFunctionalityProfile,
  ServiceUserIsValid,
  ServiceVerifyEmail,
  ServiceVerifyCnpj,
};
