const { validaSeEmailJaExiste } = require('./usuario.service');
const { cliente } = require('../models/index');
const { toUserDTO } = require('../mappers/usuario.mapper');
const { criaHash } = require('../utils/criptografia.util');


const cria = async (model) => {

  const { id, email, senha, ...resto } = model;

  // Email ja existe
  if (await validaSeEmailJaExiste(email))
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'Já existe usuário cadastrado para o email informado'
      ],
    }

  const novoCliente = await cliente.create({
    id,
    email,
    ...resto,
    senha: criaHash(senha),
    status: 'Ativo'
  });

  return {
    sucesso: true,
    mensagem: 'Operação realizada com sucesso',
    data: {
      ...toUserDTO(novoCliente)
    }
  }

}


module.exports = {
  cria
}
