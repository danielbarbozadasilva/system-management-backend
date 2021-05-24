const { fornecedor } = require('../models/index');
const { validaEmailExiste } = require('../services/usuario.service');
const { criaHash } = require('../utils/criptografia.utils');

const validaSeCnpjJaExiste = async (cnpj) => {

  const result = await fornecedor.find({
    cnpj
  });

  return result.length > 0 ? true : false;

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

module.exports = {
  cria
}
