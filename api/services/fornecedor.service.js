const { fornecedor } = require("../models/index");

const { toListItemDTO, toDTO } = require("../mappers/fornecedor.mapper");
const {
  validaSeEmailJaExiste,
  buscaTipoUsuarioPorId,
} = require("../services/usuario.service");
const { criaHash } = require("../utils/criptografia.util");
const emailUtils = require("../utils/email.utils");

const produtoMapper = require("../mappers/produto.mapper");
const {EmailHabilitar} = require("../utils/email.mensagem.habilitar")
const {EmailDesativar} = require("../utils/email.mensagem.desativar")

const validaSeCnpjJaExiste = async (cnpj) => {
  const result = await fornecedor.find({
    cnpj,
  });

  return result.length > 0 ? true : false;
};

const alteraStatus = async (id, status) => {
  const fornecedorDB = await fornecedor.findById(id);

  if (!fornecedorDB) {
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: [
        "Não existe fornecedor cadastrado para o fornecedor id informado",
      ],
    };
  }

  fornecedorDB.status = status;

  await fornecedorDB.save();

  if (status === "Ativo") {
    emailUtils.enviar({
      destinatario: fornecedorDB.email,
      remetente: process.env.SENDGRID_REMETENTE,
      assunto: `Confirmação de Ativação ${fornecedorDB.nomeFantasia}`,
      corpo: EmailHabilitar('titulo', 'menssagem', `${process.env.URL}/signin`)
      });
  }

  if (status === "Inativo") {
    emailUtils.enviar({
      destinatario: fornecedorDB.email,
      remetente: process.env.SENDGRID_REMETENTE,
      assunto: `Confirmação de Inativação ${fornecedorDB.nomeFantasia}`,
      corpo: EmailDesativar('titulo', 'menssagem', `${process.env.URL}/signin`)
      });
  }

  return {
    sucesso: true,
    mensagem: "Operação realizada com sucesso",
    data: {
      ...toListItemDTO(fornecedorDB.toJSON()),
    },
  };
};

const cria = async (model) => {
  const { email, cnpj, senha, ...resto } = model;

  if (await validaSeCnpjJaExiste(cnpj))
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: ["Já existe fornecedor cadastrado para o cnpj informado"],
    };

  if (await validaSeEmailJaExiste(email))
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: ["Já existe usuário cadastrado para o email informado"],
    };

  const novoFornecedor = await fornecedor.create({
    email,
    cnpj,
    ...resto,
    senha: criaHash(senha),
    status: "Analise",
  });

  return {
    sucesso: true,
    mensagem: "Operação realizada com sucesso",
    data: {
      ...toListItemDTO(novoFornecedor),
    },
  };
};

const listaTodos = async (filtro) => {
  const resultadoDB = await fornecedor.find({}).populate({
    path: "curtidas",
    model: "curtida",
    populate: {
      path: "cliente",
      model: "cliente",
    },
  });

  return resultadoDB.map((item) => {
    return toDTO(item.toJSON());
  });
};

const listaProdutosPorFornecedor = async (fornecedorid, fornecedorlogadoid) => {
  const fornecedorFromDB = await fornecedor
    .findById(fornecedorid)
    .populate("produtos");

  const fornecedorAsJSON = fornecedorFromDB.toJSON();
  return fornecedorAsJSON.produtos.map((item) => {
    return produtoMapper.toItemListaDTO(item);
  });
};




const listarPorId = async (fornecedorid) => {
  const fornecedorDB = await fornecedor.findById(fornecedorid);

  if (!fornecedorDB) {
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: ["o fornecedor pesquisado não existe"],
    };
  }

  return {
    sucesso: true,
    data:fornecedorDB.toJSON(),
  };
};


module.exports = {
  alteraStatus,
  listarPorId,
  cria,
  listaProdutosPorFornecedor,
  listaTodos,
};
