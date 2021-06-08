const { usuario } = require('../models/index');
const criptografia = require('../utils/criptografia.util');
const usuarioMapper = require('../mappers/usuario.mapper');

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
    email: 'daniel@email.com',
    senha: md5(`123456${process.env.MD5_SECRET}`)
  });

}

const validaSeEmailJaExiste = async (email) => {

  const usuarios = await usuario.find({ email });

  return usuarios.length > 0 ? true : false;

}

module.exports = {
  autenticar,
  cria,
  validaSeEmailJaExiste
}
