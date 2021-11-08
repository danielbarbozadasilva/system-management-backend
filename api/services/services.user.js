const { user, provider } = require('../models/models.index');
const criptografia = require('../utils/utils.cryptography');
const userMapper = require('../mappers/mappers.user');

const perfis = [
  {
    id: 1,
    description: 'admin',
    funcionalidades: [
      'ADICIONA_provider',
      'ATUALIZAR_provider',
      'PESQUISA_provider',
      'PESQUISA_provider_ID',
      'ATIVAR_provider',
      'INATIVAR_provider',
      'PESQUISA_provider_product',
      'CREATE_CATEGORY',
      'UPDATE_CATEGORY',
      'PESQUISA_CATEGORY',
      'REMOVE_CATEGORY',
      'PESQUISA_client',
    ],
  },
  {
    id: 2,
    description: 'provider',
    funcionalidades: [
      'PESQUISA_provider_ID',
      'PESQUISA_product',
      'CREATE_product',
      'REMOVE_product',
      'PESQUISA_provider_product',
      'PESQUISA_client_ID',
      'CURTIR_product',
      'REMOVE_like_product',
    ],
  },
  {
    id: 3,
    description: 'client',
    funcionalidades: [
      'like_CRIA',
      'like_REMOVE',
      'PESQUISA_provider_ID',
      'PESQUISA_provider_product',
      'PESQUISA_client',
      'PESQUISA_client_ID',
    ],
  },
];

const buscatypeuserPorId = (typeuserId) => {
  return perfis.find((item) => {
    return item.id === typeuserId;
  });
};

const validaFuncionalidadeNoPerfil = (perfilId, funcionalidade) => {
  const perfil = buscatypeuserPorId(perfilId);
  return perfil.funcionalidades.includes(funcionalidade) ? true : false;
};

const validaSeEmailJaExiste = async (email) => {
  const users = await user.find({ email });
  return users.length > 0 ? true : false;
};

const validaSeCnpjJaExiste = async (cnpj) => {
  const result = await provider.find({ cnpj });
  return result.length > 0 ? true : false;
};

const criaCredencial = async (userEmail) => {
  const userDB = await user.findOne({
    email: userEmail,
  });
  const userDTO = userMapper.toUserDTO(userDB);
  return {
    token: criptografia.criaToken(userDTO),
    userDTO,
  };
};

const autenticar = async (email, senha) => {
  const resultadoDB = await userEValido(email, senha);
  console.log(email, senha);
  if (!resultadoDB) {
    return {
      sucesso: false,
      mensagem: 'não foi possivel autenticar o user',
      detalhes: ['usuário ou senha inválido'],
    };
  }

  return {
    sucesso: true,
    mensagem: 'usuário autenticado com sucesso',
    data: await criaCredencial(email),
  };
};

const cria = async () => {
  return user.create({
    email: 'daniel80barboza@gmail.com',
    senha: md5(`daniel${process.env.MD5_SECRET}`),
  });
};

const userEValido = async (email, senha) => {
  return (await user.findOne({ email, senha: criptografia.criaHash(senha) }))
    ? true
    : false;
};

module.exports = {
  autenticar,
  buscatypeuserPorId,
  cria,
  criaCredencial,
  validaSeCnpjJaExiste,
  validaSeEmailJaExiste,
  validaFuncionalidadeNoPerfil,
};
