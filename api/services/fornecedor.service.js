const { fornecedor, curtida, cliente } = require("../models/index");

const { toListItemDTO, toDTO } = require("../mappers/fornecedor.mapper");
const {
  validaSeEmailJaExiste,
  buscaTipoUsuarioPorId,
} = require("../services/usuario.service");
const { criaHash } = require("../utils/criptografia.util");
const emailUtils = require("../utils/email.utils");

const produtoMapper = require("../mappers/produto.mapper");
const { EmailHabilitar } = require("../utils/email.mensagem.habilitar");
const { EmailDesativar } = require("../utils/email.mensagem.desativar");

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
      corpo: EmailHabilitar("titulo", "menssagem", `${process.env.URL}/signin`),
    });
  }

  if (status === "Inativo") {
    emailUtils.enviar({
      destinatario: fornecedorDB.email,
      remetente: process.env.SENDGRID_REMETENTE,
      assunto: `Confirmação de Inativação ${fornecedorDB.nomeFantasia}`,
      corpo: EmailDesativar("titulo", "menssagem", `${process.env.URL}/signin`),
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
  const resultadoDB = await fornecedor
    .find({})
    .collation({ locale: "en" })
    .sort({ nomeFantasia: 1 })
    .populate({
      path: "curtidas",
      model: "curtida",
    })
    .populate({
      path: "clientes",
      model: "cliente",
    })
    .populate({
      path: "produtos",
      model: "produto",
    });

  return resultadoDB.map((item) => {
    return toDTO(item.toJSON());
  });
};

const listarCurtida = async (filtro) => {
  const resultadoDB = await fornecedor.find({ _id: filtro }).populate({
    path: "curtidas",
    model: "curtida",
    populate: {
      path: "clientes",
      model: "cliente",
    },
  });

  return resultadoDB;
};

const fornecedorCurtidaProduto = async (fornecedorid, usuarioid) => {
  const [fornecedorDB, clienteDB] = await Promise.all([
    fornecedor.findById(fornecedorid),
    cliente.findById(usuarioid),
  ]);

  if (!fornecedorDB) {
    throw new ErrorRegraDeNegocio("o fornecedor pesquisado não existe");
  }

  const curtidaDB = await curtida.create({
    fornecedor: fornecedorid,
    cliente: usuarioid,
  });

  fornecedorDB.curtidas = [...fornecedorDB.curtidas, curtidaDB._id];
  clienteDB.curtidas = [...clienteDB.curtidas, curtidaDB._id];

  await Promise.all([fornecedorDB.save(), clienteDB.save()]);

  return {
    sucesso: true,
    data: {
      id: curtidaDB._id,
      fornecedor: fornecedorDB.nomeFantasia,
      cliente: clienteDB.nome,
    },
  };
};

const listaProdutosPorFornecedor = async (fornecedorid) => {
  const fornecedorFromDB = await fornecedor
    .findById({ _id: fornecedorid })
    .populate("produtos");

  return fornecedorFromDB;
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
    data: fornecedorDB.toJSON(),
  };
};

module.exports = {
  alteraStatus,
  listarPorId,
  cria,
  listaProdutosPorFornecedor,
  listaTodos,
  fornecedorCurtidaProduto,
  listarCurtida,
};
