const { usuario, provider } = require('../models/models.index');
const criptografia = require('../utils/utils.cryptography');
const usuarioMapper = require('../mappers/mappers.user');

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
      'CRIAR_category',
      'ALTERAR_category',
      'PESQUISA_category',
      'REMOVE_category',
      'PESQUISA_client',
    ],
  },
  {
    id: 2,
    description: 'provider',
    funcionalidades: [
      'PESQUISA_provider_ID',
      'PESQUISA_product',
      'CRIAR_product',
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

const buscatypeUsuarioPorId = (typeUsuarioId) => {
  return perfis.find((item) => {
    return item.id === typeUsuarioId;
  });
};

const validaFuncionalidadeNoPerfil = (perfilId, funcionalidade) => {
  const perfil = buscatypeUsuarioPorId(perfilId);
  return perfil.funcionalidades.includes(funcionalidade) ? true : false;
};

const validaSeEmailJaExiste = async (email) => {
  const usuarios = await usuario.find({ email });
  return usuarios.length > 0 ? true : false;
};

const validaSeCnpjJaExiste = async (cnpj) => {
  const result = await provider.find({ cnpj });
  return result.length > 0 ? true : false;
};

const criaCredencial = async (usuarioEmail) => {
  const usuarioDB = await usuario.findOne({
    email: usuarioEmail,
  });
  const usuarioDTO = usuarioMapper.toUserDTO(usuarioDB);
  return {
    token: criptografia.criaToken(usuarioDTO),
    usuarioDTO,
  };
};

const autenticar = async (email, senha) => {
  const resultadoDB = await usuarioEValido(email, senha);
  console.log(email, senha);
  if (!resultadoDB) {
    return {
      sucesso: false,
      mensagem: 'não foi possivel autenticar o usuario',
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
  return usuario.create({
    email: 'daniel80barboza@gmail.com',
    senha: md5(`daniel${process.env.MD5_SECRET}`),
  });
};

const usuarioEValido = async (email, senha) => {
  return (await usuario.findOne({ email, senha: criptografia.criaHash(senha) }))
    ? true
    : false;
};

module.exports = {
  autenticar,
  buscatypeUsuarioPorId,
  cria,
  criaCredencial,
  validaSeCnpjJaExiste,
  validaSeEmailJaExiste,
  validaFuncionalidadeNoPerfil,
};
