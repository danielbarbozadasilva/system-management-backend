const { usuario } = require('../models/index');
const md5 = require('md5');
const jwt = require('jsonwebtoken');



const criarHash = (senha) => {
  return md5(senha + hashSecret);
}

const usuarioEValido = async (email, senha) => {
  return await usuario.findOne({ email, senha: md5(`${senha}${process.env.MD5_SECRET}`) }) ? true : false;
}

const criaCredencial = async (usuarioEmail) => {

  const usuarioDB = await usuario.findOne({
    email: usuarioEmail
  });

  const { id, email, } = usuarioDB;

  const credencial = {

    token: jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_VALID_TIME}ms`,
    }),

    usuario: {
      id,
      email,
    }

  }

  return credencial;

}

const autenticar = async (email, senha) => {
  usuario.findOne

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

const cria = async () => {

  return usuario.create({
    email: 'testeezer@email.com',
    senha: md5(`123456${process.env.MD5_SECRET}`)
  });

}

module.exports = {
  autenticar,
  cria,
}
