// const { produto, categoria, fornecedor } = require('../models/index');
// const fileUtils = require('../utils/file.util');
// const produtoMapper = require('../mappers/produto.mapper');

// const cria = async (model) => {

//   const [categoriaDB, fornecedorDB] = await Promise.all([
//     categoria.findById(model.categoriaid),
//     fornecedor.findById(model.fornecedorid),
//   ]);

//   // existe o id do fornecedor
//   if (!fornecedorDB) {
//     return {
//       sucesso: false,
//       mensagem: 'operação não pode ser realizada',
//       detalhes: [
//         'Não existe fornecedor cadastrado para o fornecedor id informado'
//       ],
//     };
//   }

//   // existe o id do categoria
//   if (!categoriaDB) {
//     return {
//       sucesso: false,
//       mensagem: 'operação não pode ser realizada',
//       detalhes: [
//         'Não existe categoria cadastrada para o categoria id informado'
//       ],
//     };
//   }

//   // existe produto com mesmo nome para o mesmo fornecedor
//   // se o fornecedor logado e o mesmo que eu informo
//   const novoProduto = await produto.create({
//     nome: model.nome,
//     descricao: model.descricao,
//     preco: model.preco,
//     categoria: model.categoriaid,
//     fornecedor: model.fornecedorid,
//     imagem: {
//       nomeOriginal: model.imagem.nomeOriginal,
//       nome: model.imagem.novoNome,
//       tipo: model.imagem.tipo,
//     },
//   });


//   // Adicionar um novo produto na lista de produtos da categoria
//   categoriaDB.produtos = [...categoriaDB.produtos, novoProduto._id];

//   //Adicionar um novo produto na lista de produtos do fornecedor
//   fornecedorDB.produtos = [...fornecedorDB.produtos, novoProduto._id];

//   await Promise.all([
//     categoriaDB.save(),
//     fornecedorDB.save(),
//   ]);

//   fileUtils.move(model.imagem.caminhoOriginal, model.imagem.novoCaminho);

//   return {
//     sucesso: true,
//     mensagem: 'cadastro realizado com sucesso',
//     data: {
//       id: novoProduto._id,
//       nome: novoProduto.nome
//     }
//   }

// }

// const pesquisaPorFiltros = async (filtros) => {

//   const filtroMongo = {};

//   if (filtros.categoriaid)
//     filtroMongo.categoria = filtros.categoriaid;

//   if (filtros.fornecedorid)
//     filtroMongo.fornecedor = filtros.fornecedorid;

//   if (filtros.nomelike)
//     filtroMongo.nome = { $regex: '.*' + filtros.nomelike + '.*' };


//   const resultadoDB = await produto.find(filtroMongo).populate("categoria");


//   return resultadoDB.map(item => {
//     return produtoMapper.toItemListaDTO(item); 
//   });

// }


// const deleta = async ({ fornecedorId, produtoId, usuarioId }) => {

//   const [fornecedorDB, produtoDB] = await Promise.all([
//     fornecedor.findById(fornecedorId),
//     produto.findById(produtoId),
//   ]);

//   if (!fornecedorDB) {
//     return {
//       sucesso: false,
//       mensagem: 'operação não pode ser realizada',
//       detalhes: [
//         'O fornecedor informado não existe.'
//       ],
//     }
//   }

//   // Verificar se o fornecedor informado e o mesmo logado
//   if (fornecedorId !== usuarioId) {
//     return {
//       sucesso: false,
//       mensagem: 'operação não pode ser realizada',
//       detalhes: [
//         'O produto a ser excluido não pertence ao fornecedor.'
//       ],
//     }
//   }

//   // Valida se produto existe
//   if (!produtoDB) {
//     return {
//       sucesso: false,
//       mensagem: 'operação não pode ser realizada',
//       detalhes: [
//         'O produto informado não existe.'
//       ],
//     }
//   }


//   console.log(produtoDB.fornecedor.toString());


//   // Validar se produto pertence ao fornecedor
//   if (produtoDB.fornecedor.toString() !== fornecedorId) {
//     return {
//       sucesso: false,
//       mensagem: 'operação não pode ser realizada',
//       detalhes: [
//         'O fornecedor informado e inválido.'
//       ],
//     }
//   }

//   // Pesquisar categoria e remover o produto a ser excluido
//   const categoriaDB = await categoria.findById(produtoDB.categoria);
//   categoriaDB.produtos = categoriaDB.produtos.filter(item => {
//     return item.toString() !== produtoId
//   });

//   // Remover produto do fornecedor
//   fornecedorDB.produtos = fornecedorDB.produtos.filter(item => {
//     return item.toString() !== produtoId
//   });


//   // Excluir do produto da base
//   await Promise.all([
//     categoriaDB.save(),
//     fornecedorDB.save(),
//     produto.deleteOne(produtoDB)
//   ]);

//   // Remover imagem do produto
//   const { imagem } = produtoDB;
//   fileUtils.remove('produtos', imagem.nome);

//   return {
//     sucesso: true,
//     mensagem: 'operação realizada com sucesso',
//     data: {
//       id: produtoId,
//       nome: produtoDB.nome,
//     },
//   }

// }

// module.exports = {
//   cria,
//   pesquisaPorFiltros,
//   deleta,
// }









const { produto, categoria, fornecedor } = require('../models/index');
const fileUtils = require('../utils/file.util');
const produtoMapper = require('../mappers/produto.mapper');

// Insere o produto
const cria = async (model) => {
  console.log('-----------'+ JSON.stringify(model))
  const [categoriaDB, fornecedorDB] = await Promise.all([
    categoria.findById(model.categoriaid),
    fornecedor.findById(model.fornecedorid)
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

const listaAvancada = async (params, value) => {
  if (params) {
    return produto.find({ [params]: value })
  }
  return produto.find({})
}

const listaAvancadaID = async (id) => {
  if (id) {
    return produto.findById(id)
  }
  return produto.find({})
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

  const resultadoDB = await produto.find(filtroMongo);

  return resultadoDB.map(item => {
    // substituir por DTO
    return produtoMapper.toItemListaDTO(item);
  });

}

const deleta = async ({ fornecedorId, produtoId, usuarioId }) => {

  const [fornecedorDB, produtoDB] = await Promise.all([
    fornecedor.findById(fornecedorId),
    produto.findById(produtoId),
  ]);

  // fonecedor existe
  if (!fornecedorDB) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'O fornecedor informado não existe.'
      ],
    }
  }

  // verificar se o fornecedor informado e o mesmo logado
  if (fornecedorId !== usuarioId) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'O produto a ser excluido não pertence ao fornecedor.'
      ],
    }
  }

  // valida se produto existe
  if (!produtoDB) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'O produto informado não existe.'
      ],
    }
  }

  console.log(produtoDB.fornecedor.toString());

  // validar se produto pertence ao fornecedor
  if (produtoDB.fornecedor.toString() !== fornecedorId) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'O fornecedor informado e inválido.'
      ],
    }
  }

  // pesquisar categoria e remover o produto a ser excluido
  const categoriaDB = await categoria.findById(produtoDB.categoria);
  categoriaDB.produtos = categoriaDB.produtos.filter(item => {
    return item.toString() !== produtoId
  });

  // remover produto do fornecedor
  fornecedorDB.produtos = fornecedorDB.produtos.filter(item => {
    return item.toString() !== produtoId
  });


  // excluir do produto da base
  await Promise.all([
    categoriaDB.save(),
    fornecedorDB.save(),
    produto.deleteOne(produtoDB)
  ]);

  // remover imagem do produto
  const { imagem } = produtoDB;
  fileUtils.remove('produtos', imagem.nome);

  return {
    sucesso: true,
    mensagem: 'operação realizada com sucesso',
    data: {
      id: produtoId,
      nome: produtoDB.nome,
    },
  }

}

module.exports = {
  cria,
  pesquisaPorFiltros,
  deleta,
  listaAvancada,
  listaAvancadaID
}
