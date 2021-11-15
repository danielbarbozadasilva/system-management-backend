const { user, provider } = require('../models/models.index');
const cryptography = require('../utils/utils.cryptography');
const userMapper = require('../mappers/mappers.user');

const profile = [
  {
    id: 1,
    description: "ADMIN",
    functionality: [
      "ADD_PROVIDER",
      "UPDATE_PROVIDER",
      "SEARCH_PROVIDER",
      "SEARCH_PROVIDER_ID",
      "ENABLE_PROVIDER",
      "DISABLE_PROVIDER",
      "CREATE_CATEGORY",
      "UPDATE_CATEGORY",
      "SEARCH_CATEGORY",
      "REMOVE_CATEGORY",
      "SEARCH_CLIENT",
    ],
  },
  {
    id: 2,
    description: "PROVIDER",
    functionality: [
      "SEARCH_PROVIDER_ID",
      "SEARCH_PRODUCT",
      "CREATE_PRODUCT",
      "REMOVE_PRODUCT",
      "SEARCH_CLIENT_ID",
      "CREATE_LIKE_PRODUCT",
      "REMOVE_LIKE_PRODUCT",
    ],
  },
  {
    id: 3,
    description: "CLIENT",
    functionality: [
      "LIKE_CREATE",
      "LIKE_REMOVE",
      "SEARCH_PROVIDER_ID",
      "SEARCH_CLIENT",
      "SEARCH_CLIENT_ID",
    ],
  },
];

const ServiceSearchTypeUserById = (type) => {
  return profile.find((item) => {
    return item.id === type ? true : false;;
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

const ServiceValidateFunctionalityProfile = (profile_id, functionality) => {
  const profile = ServiceSearchTypeUserById(profile_id);
  return profile?.functionality?.includes(functionality);
};

const ServiceValidateEmailExists = async (email) => {
  const users = await user.find({ email });
  return users.length > 0 ? true : false;
};

const ServiceValidateCnpjExists = async (cnpj) => {
  const result = await provider.find({ cnpj });
  return result.length > 0 ? true : false;
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
  ServiceValidateCnpjExists,
  ServiceValidateEmailExists,
  ServiceValidateFunctionalityProfile,
  ServiceUserIsValid,
};
