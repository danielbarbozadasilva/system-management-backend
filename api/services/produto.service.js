const { produto, categoria, fornecedor } = require('../models/index');
const fileUtils = require('../utils/file.util');
const produtoMapper = require('../mappers/produto.mapper');

const cria = async (model) => {

  const [categoriaDB, fornecedorDB] = await Promise.all([
    categoria.findById(model.categoriaid),
    fornecedor.findById(model.fornecedorid),
  ]);

  // existe o id do fornecedor
  if (!fornecedorDB) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'Não existe fornecedor cadastrado para o fornecedor id informado'
      ],
    };
  }

  // existe o id do categoria
  if (!categoriaDB) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'Não existe categoria cadastrada para o categoria id informado'
      ],
    };
  }

  // existe produto com mesmo nome para o mesmo fornecedor
  // se o fornecedor logado e o mesmo que eu informo
  const novoProduto = await produto.create({
    nome: model.nome,
    descricao: model.descricao,
    preco: model.preco,
    categoria: model.categoriaid,
    fornecedor: model.fornecedorid,
    imagem: {
      nomeOriginal: model.imagem.nomeOriginal,
      nome: model.imagem.novoNome,
      tipo: model.imagem.tipo,
    },
  });

  // Adiciona um novo produto na lista de produtos da categoria
  categoriaDB.produtos = [...categoriaDB.produtos, novoProduto._id];

  // Adiciona um novo produto na lista de produtos do fornecedor
  fornecedorDB.produtos = [...fornecedorDB.produtos, novoProduto._id];

  await Promise.all([
    categoriaDB.save(),
    fornecedorDB.save(),
  ]);

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

const pesquisaPorFiltros = async (filtros) => {

  const filtroMongo = {};

  // se eu tenho o valor eu anexo ao meu filtro senão passa batido
  if (filtros.categoriaid)
    filtroMongo.categoria = filtros.categoriaid;

  // se eu tenho o valor eu anexo ao meu filtro senão passa batido
  if (filtros.fornecedorid)
    filtroMongo.fornecedor = filtros.fornecedorid;

  // se eu tenho o valor eu anexo ao meu filtro senão passa batido
  if (filtros.nomelike)
    filtroMongo.nome = { $regex: '.*' + filtros.nomelike + '.*' };

  console.log(filtroMongo);

  const resultadoDB = await produto.find(filtroMongo);

  return resultadoDB.map(item => {
    // substituir por DTO
    return produtoMapper.toItemListaDTO(item);
  });

}

module.exports = {
  cria,
  pesquisaPorFiltros
}
