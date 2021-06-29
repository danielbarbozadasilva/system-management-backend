const fornecedorService = require("../services/fornecedor.service");
const curtidaService = require("../services/curtida.service");
const { copyFileSync } = require("fs");

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

  console.log('--------------------------------------')
  console.log('--------------------------------------')
  console.log(body)
  console.log('--------------------------------------')
  console.log('--------------------------------------')

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
  const { id, tipoUsuario } = req.usuario;

  const result = await fornecedorService.listarPorId(fornecedorid, {
    id,
    tipo: tipoUsuario,
  });

  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso
    ? { data: result.data }
    : { detalhes: result.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
};

const pesquisarCurtidasRecebidas = async (req, res, next) => {
  const { fornecedorid } = req.params;

  const result = await fornecedorService.listaTodos(fornecedorid);

 

  return res.status(200).send(result);
  
};

const buscaProdutosPorFornecedor = async (req, res, next) => {
  const { params } = req;

  const data = await fornecedorService.listaProdutosPorFornecedor(
    params.fornecedorid
  );

  return res.status(200).send({
    data,
  });
};


const recebeCurtidas = async (req, res, next) => {
  const { params, usuario } = req;

  const result = await curtidaService.cria(params.fornecedorid, usuario.id);
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
  // curtidasRecebidas,
  buscaPorId,
  recebeCurtidas,
  removeCurtidas,
  pesquisarCurtidasRecebidas,
  buscaProdutosPorFornecedor,
};
