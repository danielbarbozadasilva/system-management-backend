const { usuario } = require("../models/index");
const criptografia = require("../utils/criptografia.util");
const usuarioMapper = require("../mappers/usuario.mapper");

const perfis = [
  {
    id: 1,
    descricao: "administrador",
    funcionalidades: [
      "ALTERA_CATEGORIA",
      "CRIA_CATEGORIA",
      // 'PESQUISA_CATEGORIA',
      "REMOVE_CATEGORIA",
      "ALTERA_CATEGORIA",
      // 'PESQUISA_FORNECEDOR',
      "PESQUISA_FORNECEDOR_ID",
      "ADICIONA_FORNECEDOR",
      "ATIVAR_FORNECEDOR",
      "INATIVAR_FORNECEDOR",
      "PESQUISA_FORNECEDOR_PRODUTO",
      "DELETA_CATEGORIA",
    ],
  },
  {
    id: 2,
    descricao: "fornecedor",
    funcionalidades: [
      "ALTERA_FORNECEDOR",
      "PESQUISA_FORNECEDOR_ID",
      // 'PESQUISA_PRODUTO',
      "ATUALIZAR_PRODUTO",
      "INSERIR_PRODUTO",
      "EXCLUIR_PRODUTO",
      "CRIA_PRODUTO",
      "REMOVE_PRODUTO",
      "PESQUISA_FORNECEDOR_PRODUTO",
    ],
  },
  {
    id: 3,
    descricao: "cliente",
    funcionalidades: [
      "CURTIDA_CRIA",
      "CURTIDA_REMOVE",
      "PESQUISA_FORNECEDOR_ID",
      "PESQUISA_FORNECEDOR_PRODUTO",
      // 'PESQUISA_CATEGORIA'
    ],
  },
];
const buscaTipoUsuarioPorId = (tipoUsuarioId) => {
  return perfis.find(item => {
    return item.id === tipoUsuarioId
  })

}

const validaSeUsuarioValido = async (usuario) => {

  // const usuarioDB = await usuario.findOne({ email });

  if (!usuario)
    return false;

  if (usuario.kind === "fornecedor")
    return usuario.status === "Ativo" ? true : false;

  return true;
}

const validaSeEmailJaExiste = async (email) => {

  const usuarios = await usuario.find({ email });

  return usuarios.length > 0 ? true : false;

}

//NOVO
const usuarioEValido = async (email, senha) => {
  return await usuario.findOne({ email, senha: criptografia.criaHash(senha) })
}

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

  if (!(await validaSeUsuarioValido(resultadoDB))) {

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


//TODO: remover do servico de usuarios

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
  buscaTipoUsuarioPorId,
  cria,
  validaSeEmailJaExiste,
  validaSeUsuarioValido,
  validaFuncionalidadeNoPerfil
}
