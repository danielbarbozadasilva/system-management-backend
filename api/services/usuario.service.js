const { usuario } = require('../models/index');
const criptografia = require('../utils/criptografia.util');
const usuarioMapper = require('../mappers/usuario.mapper');

const perfis = [
  {
    id: '1',
    descricao: 'administrador',
    funcionalidades: [
      'CRIA_CATEGORIA'
    ]
  },
  {
    id: '2',
    descricao: 'fornecedor',
    funcionalidades: [

    ]
  },
  {
    id: '3',
    descricao: 'cliente',
    funcionalidades: [
    ]
  },
];


// Função responsável por validar se o usuário existe
const usuarioEValido = async (email, senha) => {
  return await usuario.findOne({ email, senha: criptografia.criaHash(senha) }) ? true : false;
}

// Função responsável por criar a credencial do usuário
const criaCredencial = async (usuarioEmail) => {

  const usuarioDB = await usuario.findOne({
    email: usuarioEmail
  });

  const usuarioDTO = usuarioMapper.toUserDTO(usuarioDB);

  return {
    token: criptografia.criaToken(usuarioDTO),
    usuarioDTO,
  };

}

// Função responsável por autenticar do usuário
const autenticar = async (email, senha) => {

  const resultadoDB = await usuarioEValido(email, senha);

  if (!resultadoDB) {
    return {
      sucesso: false,
      mensagem: "não foi possivel autenticar o usuario",
      detalhes: [
        "usuário ou senha inválido",
      ],
    }
  }


  return {
    sucesso: true,
    mensagem: "usuário autenticado com sucesso",
    data: await criaCredencial(email)
  }

}

// Função que cria o usuário no sistema
const cria = async () => {

  return usuario.create({
    email: 'daniel80barboza@gmail.com',
    senha: md5(`123456${process.env.MD5_SECRET}`)
  });

}

const validaSeEmailJaExiste = async (email) => {

  const usuarios = await usuario.find({ email });

  return usuarios.length > 0 ? true : false;

}

const buscarPefilPorId = (perfilId) => {
  const result = perfis.find(item => Number(item.id) === Number(perfilId));
  return result;
}

const validaFuncionalidadeNoPerfil = (perfilId, funcionalidade) => {
  const perfil = buscarPefilPorId(perfilId);
  return perfil.funcionalidades.includes(funcionalidade);
}

module.exports = {
  autenticar,
  cria,
  validaSeEmailJaExiste,
  validaFuncionalidadeNoPerfil
}
