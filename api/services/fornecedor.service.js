const { fornecedor } = require('../models/index');
const { validaEmailExiste } = require('./usuario.service');
const { criaHash } = require('../utils/criptografia.util');
const {toListItemDTO} = require('../mappers/fornecedor.mapper');

const validaSeCnpjJaExiste = async (cnpj) => {
  const result = await fornecedor.find({
    cnpj
  });

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
  return fornecedorDB.save();
}

const cria = async (model) => {
  const { email, cnpj, senha, ...resto } = model;

  // Caso o CNPJ já exista
  if (await validaSeCnpjJaExiste(cnpj))
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'Já existe fornecedor cadastrado para o cnpj informado'
      ],
    }

  // Caso o e-mail já exista
  if (await validaEmailExiste(email))
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'Já existe usuário cadastrado para o email informado'
      ],
    }

  // Caso nem o e-mail e o CNPJ existam, ele cria o fornecedor
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
      ...novoFornecedor
    }
  }

}


const listaTodos = async (filtro) => {
  const resultadoDB = await fornecedor.find();
  return resultadoDB.map(item => {
    return toListItemDTO(item);
  })

}

module.exports = {
  alteraStatus,
  cria,
  listaTodos
}