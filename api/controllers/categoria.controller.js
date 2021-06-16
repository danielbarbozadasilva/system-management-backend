const categoriaService = require('../services/categoria.service');

// Função que lista todas as categorias
const listaTodasAsCategorias = async (req, res, next) => {

  const result = await categoriaService.listaTodos();

  return res.status(200).send({ data: result });
}


const buscarPorId = async (req, res, next) => {

  // pega o ID
  const { params } = req;

  // Verifica se a categoria existe
  const categoria = await categoriaService.buscaPorId(params.categoriaid);

  // Caso não exista
  if (!categoria)
    return res.status(404).send({
      detalhes: [
        "categoria informada nao existe"
      ]
    });

  // Caso exista retorna a categoria
  return res.status(200).send(categoria);
}



const ListarProdutosPorCategoria = async (req,res,next) => {
  const { categoria } = req.params;

  const lista = await categoriaService.pesquisaPorFiltros(categoria)

  return res.status(200).send(lista)
} 
  
const criarCategoria = async (req, res, next) => {

  // recolhe as informações que vem da request
  const { body } = req;
  
  // invoca o serviço
  const resultadoServico = await categoriaService.criaCategoria(body);
  
  // obtem a resposta do serviço e prepara o retorno
  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };
  return res.status(codigoRetorno).send(dadoRetorno);

}


const alterarCategoria = async (req, res, next) => {

  // Precisa pegar dados do parametro e do 'body'
  const { params, body } = req;

  // invoca o serviço de negócio, representa a operação de négocio que quero realizar 
  const resultadoServico = await categoriaService.alteraCategoria(params.categoriaid, body);
  
  // 200 - sucesso | 400 (Bad request) - em caso de falha
  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);

}

const deletarCategoria = async (req, res, next) => {
  
  // Pega o parametro
  const { params } = req;

  // Passa o parametro para a função de deleção (service)
  const resultadoServico = await categoriaService.deleta(params.categoriaid);

  // 200 - sucesso | 400 (Bad request) - em caso de falha
  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;

  const dadoRetorno = resultadoServico.sucesso ? {
    mensagem: resultadoServico.mensagem
  } : { detalhes: resultadoServico.detalhes };

  // codigo do serviço  e o seu respectivo tratamento
  return res.status(codigoRetorno).send(dadoRetorno);

}



module.exports = {
  listaTodasAsCategorias,
  buscarPorId,
  criarCategoria,
  deletarCategoria,
  alterarCategoria,
  ListarProdutosPorCategoria
}
