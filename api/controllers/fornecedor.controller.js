const fornecedorService = require('../services/fornecedor.service');

const criarFornecedor = async (req, res, next) => {

  // Pega o parametro
  const { body } = req;

  // invoca o serviço de negócio, representa a operação de négocio que quero realizar 
  const result = await fornecedorService.cria(body);

  // 200 - sucesso | 400 (Bad request) - em caso de falha
  const codigoRetorno = result.sucesso ? 200 : 400;
  const dadoRetorno = result.sucesso ? { data: result.data } : { detalhes: result.detalhes };
 
  // codigo do serviço  e o seu respectivo tratamento
  return res.status(codigoRetorno).send(dadoRetorno);

}


module.exports = {
    criarFornecedor
}
