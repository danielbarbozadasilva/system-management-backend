const { validaSeEmailJaExiste } = require('./usuario.service');
const { cliente } = require('../models/index');
const { toListItemDTO } = require('../mappers/cliente.mapper');
const { criaHash } = require('../utils/criptografia.util');


const cria = async (model) => {

  const { email, senha, ...resto } = model;
  if (await validaSeEmailJaExiste(email))
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'Já existe usuário cadastrado para o email informado'
      ],
    }

  const novoCliente = await cliente.create({
    email,
    ...resto,
    senha: criaHash(senha),
    status: 'Ativo'
  });

  return {
    sucesso: true,
    mensagem: 'Operação realizada com sucesso',
    data: {
      ...toListItemDTO(novoCliente)
    }
  }

}


module.exports = {

  cria,

}
