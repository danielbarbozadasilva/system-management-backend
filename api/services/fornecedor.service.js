const { fornecedor } = require('../models/index');
const { toListItemDTO, toDTO } = require('../mappers/fornecedor.mapper');
const { validaSeEmailJaExiste } = require('../services/usuario.service');

const { criaHash } = require('../utils/criptografia.util');
const emailUtils = require('../utils/email.utils');

const produtoMapper = require('../mappers/produto.mapper');

const validaSeCnpjJaExiste = async (cnpj) => {
  const result = await fornecedor.find({ cnpj });
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

  if (status === 'Ativo') {

    // Adicionar o envio de email
    emailUtils.enviar({
      destinatario: fornecedorDB.email,
      remetente: process.env.SENDGRID_REMETENTE,
      assunto: `Confirmação do cadastro de ${fornecedorDB.nomeFantasia}`,
      corpo: `sua conta do projeto 04 já esta liberada para uso para uso já`,
    });

  }

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

  const resultadoDB = await fornecedor.find();

  return resultadoDB.map(item => {
    return toDTO(item.toJSON());
  })
}

const listaProdutosID = async (id) => {
  const resultadoDB = await fornecedor.findById(id);
  console.log(resultadoDB)
  return resultadoDB.map(item => {
    return toDTO(item.toJSON());
  })
}

const listaProdutosByFornecedor = async (fornecedorid, fornecedorlogadoid) => {
  // verificar se fornecedor informado e o mesmo que o logado
  const fornecedorFromDB = await fornecedor.findById(fornecedorid).populate('produtos');

  const fornecedorAsJSON = fornecedorFromDB.toJSON();
  return fornecedorAsJSON.produtos.map(item => {
    return produtoMapper.toItemListaDTO(item);
  });
}

module.exports = {
  alteraStatus,
  cria,
  listaProdutosByFornecedor,
  listaTodos,
  listaProdutosID
}
