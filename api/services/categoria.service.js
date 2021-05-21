const { categoria } = require('../models/index');
const categoriaMapper = require('../mappers/categoria.mapper');
const fileUtils = require('../utils/file.util');


const buscaPorId = async (categoriaid) => {

  const categoriaDB = await categoria.findById(categoriaid);

  if (categoriaDB) 
  return categoriaMapper.toDTO(categoriaDB);
  // retorno o resultado da transformação do meu 'mapper', ou seja a minha saida do 'endpoint'

  return;

}

const listaTodos = async () => {

  const listaCategoriasDB = await categoria.find({});

  return listaCategoriasDB.map(categortiaDB => {

    return categoriaMapper.toItemListaDTO(categortiaDB);

  });

}

const criaCategoria = async (model) => {
  
  const categoriaDB = await categoria.findOne({ nome: model.nome });
  
  // valido, caso não encontre a categoria na base de dados
  if (categoriaDB) {
    return {
      sucesso: false,
      mensagem: 'não foi possível realizar a operação',
      detalhes: [
        '"nome" já existe no banco de dados.'
      ]
    };
  }

  // tratar nomes repetidos e incluir nova categoria
  const novaCategoria = await categoria.create({
    nome: model.nome,
    descricao: model.descricao,
    status: model.status,
    imagem: {
      nomeOriginal: model.imagem.nomeOriginal,
      nome: model.imagem.novoNome,
      tipo: model.imagem.tipo,
    }
  })

  // mover arquivo para destino definitivo
  fileUtils.move(model.imagem.caminhoOriginal, model.imagem.novoCaminho);

  return {
    sucesso: true,
    mensagem: 'cadastro realizado com sucesso',
    data: categoriaMapper.toDTO(novaCategoria)
  }

}

const deleta = async (categoriaId) => {
  // localizar documento
  const categoriaDB = await categoria.findOne({ _id: categoriaId });
  // valido, caso não encontre a categoria na base de dados
  if (!categoriaDB) {
    return {
      sucesso: false,
      mensagem: 'não foi possível realizar a operação',
      detalhes: [
        '"categoriaid" não existe.'
      ]
    };
  }

  // Criar tratamento para quando existem produtos associados a categoria
  const { imagem } = categoriaDB;  
  
  // Remove o arquivo
  fileUtils.remove('categorias', imagem.nome);

  // Deletar do banco de dados
  await categoria.remove({
    _id: categoriaId,
  });

  return {
    sucesso: true,
    mensagem: 'Operação realizada com sucesso.'
  }

}

const alteraCategoria = async (categoriaId, model) => {

  // O primeiro passo para alterar um dado é encontrá-lo na base de dados
  const categoriaDB = await categoria.findOne({ _id: categoriaId });

  // Tratamento caso seja inexistente
  if (!categoriaDB) {
    return {
      sucesso: false,
      mensagem: 'não foi possível realizar a operação',
      detalhes: [
        '"categoriaid" não existe.'
      ]
    };
  }

  /* Ele não caiu no 'if', então ele existe. Preciso remover o arquivo (o arquivo que ele já tem) 
  (da onde eu quero retornar | o nome do elemento que eu quero remover */
  fileUtils.remove('categorias', categoriaDB.imagem.nome);

  // Salva na base
  categoriaDB.nome = model.nome;
  categoriaDB.descricao = model.descricao;
  categoriaDB.status = model.status;
  categoriaDB.imagem = {
    nomeOriginal: model.imagem.nomeOriginal,
    nome: model.imagem.novoNome,
    tipo: model.imagem.tipo,
  }

  await categoriaDB.save();

  // Move arquivo para destino definitivo
  fileUtils.move(model.imagem.caminhoOriginal, model.imagem.novoCaminho);

  return {
    sucesso: true,
    mensagem: 'operação relaizada com sucesso',
    data: categoriaMapper.toDTO(categoriaDB),
  }

}

module.exports = {
  buscaPorId,
  criaCategoria,
  alteraCategoria,
  listaTodos,
  deleta
}
