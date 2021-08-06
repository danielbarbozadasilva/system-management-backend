const fornecedorService = require("../services/fornecedor.service");
const curtidaService = require("../services/curtida.service");
const produtoMapper = require("../mappers/produto.mapper");
const { produto, categoria, fornecedor } = require("../models/index");

const ativa = async (req, res, next) => {
  const { fornecedorid } = req.params;

  const resultadoServico = await fornecedorService.alteraStatus(
    fornecedorid,
    "Ativo"
  );
  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso
    ? { data: resultadoServico.data }
    : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send({
    ...dadoRetorno,
  });
};

const inativa = async (req, res, next) => {
  const { fornecedorid } = req.params;

  const resultadoServico = await fornecedorService.alteraStatus(
    fornecedorid,
    "Inativo"
  );

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso
    ? { data: resultadoServico.data }
    : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send({
    mensagem: "operaçao realizada com sucesso",
    ...dadoRetorno,
  });
};

const inserirFornecedor = async (req, res, next) => {
  const { body } = req;
  const result = await fornecedorService.cria(body);

  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
};

const listaFornecedores = async (req, res, next) => {
  const data = await fornecedorService.listaTodos();

  return res.status(200).send({
    data,
  });
};

const buscaPorId = async (req, res, next) => {
  const { fornecedorid } = req.params;

  const result = await fornecedorService.listarPorId(fornecedorid);

  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
};

const getPesquisarFornecedorLocalidade = async (req, res, next) => {
  const { uf, cidade } = req.query;
  let filtro = {};
  console.log(cidade);
  if (cidade == undefined || cidade == "x") {
    filtro = { uf };
  } else {
    filtro = { uf, cidade };
  }
  const resultadoDB = await fornecedor.find(filtro);
  // .populate({
  //   path: "produtos",
  //   model: "produto",
  // });

  return res.send(resultadoDB);
};

const listaProdutosByFornecedor = async (fornecedorid, fornecedorlogadoid) => {
  const fornecedorFromDB = await fornecedor
    .findById(fornecedorid)
    .populate("produtos");
  const fornecedorAsJSON = fornecedorFromDB.toJSON();
  return fornecedorAsJSON.produtos.map((item) => {
    return produtoMapper.toItemListaDTO(item);
  });
};

const pesquisarCurtidasRecebidas = async (req, res, next) => {
  const { fornecedorid, params, usuario } = req.params;
  const result = await fornecedorService.fornecedorCurtidaProduto({
    usuario,
    fornecedorid: params.fornecedorid,
  });
  return res.status(200).send(result);
};

const buscaProdutosPorFornecedor = async (req, res, next) => {
const id = req.params.fornecedorid;
  const data = await fornecedorService.listaProdutosPorFornecedor(id);

  return res.status(200).send({ data });
};

const recebeCurtidas = async (req, res, next) => {
  const { params, usuario } = req;
  const { fornecedorid } = req.params;

  const result = await curtidaService.cria(fornecedorid, usuario.id);
  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
};

const removeCurtidas = async (req, res, next) => {
  const { usuario, params } = req;
  const result = await curtidaService.remove(params.fornecedorid, usuario.id);
  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };
  return res.status(codigoRetorno).send(dadoRetorno);
};

module.exports = {
  ativa,
  inserirFornecedor,
  inativa,
  listaFornecedores,
  buscaPorId,
  recebeCurtidas,
  removeCurtidas,
  pesquisarCurtidasRecebidas,
  buscaProdutosPorFornecedor,
  listaProdutosByFornecedor,
  getPesquisarFornecedorLocalidade,
};
