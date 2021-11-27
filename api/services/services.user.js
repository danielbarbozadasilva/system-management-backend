const { user, provider } = require('../models/models.index');
const cryptography = require('../utils/utils.cryptography');
const userMapper = require('../mappers/mappers.user');

const profile = [
  {
    id: 1,
    description: 'ADMIN',
    functionality: [
      'ADD_PROVIDER',
      'UPDATE_PROVIDER',
      'DELETE_PROVIDER',
      'CHANGE_STATUS_PROVIDER',
      'CREATE_CATEGORY',
      'UPDATE_CATEGORY',
      'REMOVE_CATEGORY',
    ],
  },
  {
    id: 2,
    description: 'PROVIDER',
    functionality: [
      'SEARCH_PRODUCT',
      'CREATE_PRODUCT',
      'UPDATE_PRODUCT',
      'REMOVE_PRODUCT',
      'CREATE_LIKE_PRODUCT',
      'REMOVE_LIKE_PRODUCT',
    ],
  },
  {
    id: 3,
    description: 'CLIENT',
    functionality: ['LIKE_CREATE', 'LIKE_REMOVE'],
  },
];

const ServiceSearchTypeUserById = (type) => {
  return profile.find((item) => {
    return item.id === type ? true : false;
  });
};

const ServiceCreateCredential = async (email) => {
  const userDB = await user.findOne({ email: email });
  const userDTO = userMapper.toUserDTO(userDB);
  const userToken = cryptography.UtilCreateToken(userDTO);
  if (userDTO && userToken) {
    return {
      token: userToken,
      userDTO,
    };
  } else {
    return false;
  }
};

const ServiceVerifyFunctionalityProfile = async (typeUser, test) => {
  const profile = ServiceSearchTypeUserById(typeUser);
  if (profile?.functionality?.includes(test) && profile) {
    return true;
  } else {
    return false;
  }
};

const ServiceVerifyEmailBodyExists = async (email) => {
  const users = await user.find({ email });
  return users.length > 0 ? false : true;
};

const ServiceVerifyCnpjExists = async (cnpj) => {
  const result = await provider.find({ cnpj });
  return result.length > 0 ? true : false;
};

const ServiceVerifyEmail = async (id, data) => {
  const result = await provider
    .findOne(Object({ email: data }))
    .where('_id')
    .ne(id);
  return result ? true : false;
};

const ServiceVerifyCnpj = async (id, data) => {
  const result = await provider
    .findOne(Object({ cnpj: data }))
    .where('_id')
    .ne(id);
  return result ? true : false;
};

const ServiceAuthenticate = async (email, password) => {
  const resultadoDB = await ServiceUserIsValid(email, password);
  const res_create_credential = await ServiceCreateCredential(email);

  if (!resultadoDB) {
    return {
      success: false,
      message: 'Unable to authenticate user',
      details: ['Invalid username or password'],
    };
  }
  if (!res_create_credential) {
    return {
      success: false,
      details: ['it was not possible to create the credential'],
    };
  }
  return {
    success: true,
    message: 'Successfully authenticated user',
    data: res_create_credential,
  };
};

const ServiceVerifyStatusProvider = async (id) => {
  const result = await user.find({
    _id: id,
    kind: 'provider',
    status: 'ANALYSIS',
  });

  if (result.length === 0) {
    return false;
  } else {
    return true;
  }
};

const ServiceUserIsValid = async (email, password) => {
  return (await user.findOne({
    email: email,
    password: cryptography.UtilCreateHash(password),
  }))
    ? true
    : false;
};

module.exports = {
  ServiceAuthenticate,
  ServiceVerifyStatusProvider,
  ServiceSearchTypeUserById,
  ServiceCreateCredential,
  ServiceVerifyCnpjExists,
  ServiceVerifyEmailBodyExists,
  ServiceVerifyFunctionalityProfile,
  ServiceUserIsValid,
  ServiceVerifyEmail,
  ServiceVerifyCnpj,
};
