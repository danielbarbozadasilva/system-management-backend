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
      'SEARCH_PROVIDER',
      'SEARCH_PROVIDER_ID',
      'ACTIVE_PROVIDER',
      'INACTIVATE_PROVIDER',
      'SEARCH_PROVIDER_PRODUCT',
      'CREATE_CATEGORY',
      'UPDATE_CATEGORY',
      'SEARCH_CATEGORY',
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
      'REMOVE_PRODUCT',
      'SEARCH_PROVIDER_PRODUCT',
      'SEARCH_CLIENT_ID',
      'CURTIR_PRODUCT',
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
      'SEARCH_PROVIDER_PRODUCT',
      'SEARCH_CLIENT',
      'SEARCH_CLIENT_ID',
    ],
  },
];

const ServiceSearchTypeUserById = (user_id) => {
  return ServiceAuthenticate.find((item) => {
    return item.id === user_id;
  });
};

const ServiceValidateFunctionalityProfile = (profile_id, functionality) => {
  const profile = buscatypeuserPorId(profile_id);
  return profile.functionality.includes(functionality) ? true : false;
};

const ServiceValidateEmailExists = async (email) => {
  const users = await user.find({ email });
  return users.length > 0 ? true : false;
};

const ServiceValidateFunctionalityCnpj = async (cnpj) => {
  const result = await provider.find({ cnpj });
  return result.length > 0 ? true : false;
};

const ServiceCreateCredential = async (userEmail) => {
  const userDB = await user.findOne({
    email: userEmail,
  });
  const userDTO = userMapper.toUserDTO(userDB);
  return {
    token: cryptography.UtilCreateToken(userDTO),
    userDTO,
  };
};

const ServiceAuthenticate = async (email, password) => {
  const resultadoDB = await ServiceUserIsValid(email, password);
  console.log(email, password);
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

const ServiceCreateUser = async () => {
  return user.create({
    email: 'daniel80barboza@gmail.com',
    password: md5(`daniel${process.env.MD5_SECRET}`),
  });
};

const ServiceUserIsValid = async (email, password) => {
  return (await user.findOne({
    email,
    password: cryptography.createHash(password),
  }))
    ? true
    : false;
};

module.exports = {
  ServiceAuthenticate,
  ServiceSearchTypeUserById,
  ServiceCreateUser,
  ServiceCreateCredential,
  ServiceValidateFunctionalityCnpj,
  ServiceValidateEmailExists,
  ServiceValidateFunctionalityProfile,
  ServiceUserIsValid,
};
