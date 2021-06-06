const { produto, categoria, fornecedor } = require('../models/index');
const fileUtils = require('../utils/file.utils');

const cria = async (model) => {

  // existe o id do fornecedor
  // existe o id do categoria
  // existe produto com mesmo nome para o mesmo fornecedor
  const novoProduto = await produto.create({
    nome: model.nome,
    descricao: model.descricao,
    preco: model.preco,
    categoriaid: model.categoriaid,
    fornecedorid: model.fornecedorid,
    imagem: {
      nomeOriginal: model.imagem.nomeOriginal,
      nome: model.imagem.novoNome,
      tipo: model.imagem.tipo,
    },
  })


  // Adicionar novo produto na lista de produtos da categoria
  await categoria.findByIdAndUpdate(
    model.categoriaid,
    { $push: { produtos: novoProduto._id } },
    { new: true, useFindAndModify: false }
  )

  // Adicionar novo produto na lista de produtos do fornecedor
  await fornecedor.findByIdAndUpdate(
    model.categoriaid,
    { $push: { produtos: novoProduto._id } },
    { new: true, useFindAndModify: false }
  )


  fileUtils.move(model.imagem.caminhoOriginal, model.imagem.novoCaminho);

  return {
    sucesso: true,
    mensagem: 'cadastro realizado com sucesso',
    data: {
      id: novoProduto._id,
      nome: novoProduto.nome
    }
  }

}



module.exports = {
  cria
}
