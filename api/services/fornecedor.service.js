const { fornecedor } = require('../models/index');
const { toListItemDTO } = require('../mappers/fornecedor.mapper');
const { validaSeEmailJaExiste } = require('../services/usuario.service');
const { criaHash } = require('../utils/criptografia.util');
const emailUtils = require('../utils/email.utils');

const validaSeCnpjJaExiste = async (cnpj) => {

  const result = await fornecedor.find({cnpj});

  return result.length > 0 ? true : false;
  
}

const alteraStatus = async (id, status) => {

  const fornecedorDB = await fornecedor.findById(id);

  if (!fornecedorDB) {

    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'Não existe fornecedor cadastrado para o fornecedor id informado'
      ],
    };

  }


  fornecedorDB.status = status;
  await fornecedorDB.save();

  emailUtils.enviar({
    destinatario: fornecedor,
    remetente: process.env.SENDGRID_REMETENTE
  })

  return {
    sucesso: true,
    mensagem: 'Operação realizada com sucesso',
    data: {
      ...toListItemDTO(fornecedorDB.toJSON())
    }
  }

}

const cria = async (model) => {

  // console.log('fornecedor.service');

  const { email, cnpj, senha, ...resto } = model;

  //TODO: cnpj ja existente
  if (await validaSeCnpjJaExiste(cnpj))
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'Já existe fornecedor cadastrado para o cnpj informado'
      ],
    }

  //TODO: email ja existente
  if (await validaSeEmailJaExiste(email))
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'Já existe usuário cadastrado para o email informado'
      ],
    }

  const novoFornecedor = await fornecedor.create({
    email,
    cnpj,
    ...resto,
    senha: criaHash(senha),
    status: 'Analise'
  });

  return {
    sucesso: true,
    mensagem: 'Operação realizada com sucesso',
    data: {
      ...toListItemDTO(novoFornecedor)
    }
  }

}

const listaTodos = async (filtro) => {

  // const { status } = filtro;

  // const body = {};

  // if (status)
  //   body.status = status;

  const resultadoDB = await fornecedor.find();

  return resultadoDB.map(item => {
    return toListItemDTO(item);
  })

}

module.exports = {
  alteraStatus,
  cria,
  listaTodos,
}
