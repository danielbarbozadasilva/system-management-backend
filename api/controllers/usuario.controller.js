const usuarioService = require('../services/usuario.service');

const auth = async (req, res, next) => {
  
  // pega email e senha
  const { email, senha } = req.body;

  // pega o valor se é sucesso ou não
  const resultadoServico = await usuarioService.autenticar(email, senha);

  // verifica o valor
  const codigoRetorno = resultadoServico.sucesso ? 200 : 401;
  const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

  // request finalizada com as informações que ele retornou 
  return res.status(codigoRetorno).send({
    mensagem: resultadoServico.mensagem,
    ...dadoRetorno
  });

}


module.exports = {
  auth
}