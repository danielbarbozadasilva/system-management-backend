const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const fileUtils = require('../file.util');


// Função que me retorna um middleware
const fileUpload = (destino, isUpdate = false) => {

  const form = formidable.IncomingForm();
  form.uploadDir = fileUtils.criaEndereco('temp');

  return (req, res, next) => {

    form.parse(req, (err, fields, files) => {

      req.body = {
        // O DTO olha para o BODY para fazer a validação 
        
        // campos do formulario, sem a imagem
        ...fields,

        /* contruo um novo objeto, vai gerar metadados para 
        que o serviço para dar continuidade no trabalho dele */

        /* o 'SERVIÇO' vai pegar as informações do 'DTO', extrair as informações do 'DTO',
        MONTAR um MODEL para eu cadastrar no 'MONGO', APARTIR DO 'mongoose'. Na sequencia
        preciso mover o arquivo da paste 'TEMPORÁRIA' para o arquivo da pasta de 'DESTINO' */
      }
      // files (mesmo nome que vai estar no meu frontend)
      // caso não tenha um atributo de um nome 'imagem'
      if (!files.imagem && !isUpdate) {
        return res.status(400).send({
          mensagem: 'não foi possível realizar a operação',
          detalhes: [
            '"imagem" é de preenchimento obrigatório.'
          ]
        });
      }



      if (files.imagem) {
        // se não caiu na validação acima, RECEBI UM ARQUIVO COM O NOME DE 'IMAGEM'
        const novoNome = fileUtils.criaNome(files.imagem.type);

        // o destino (onde vou salvar) e o nome da imagem (novo nome da imagem) 
        const novoCaminho = fileUtils.criaEndereco(destino, novoNome);

        req.body.imagem = {
          tipo: files.imagem.type,
          nomeOriginal: files.imagem.name,
          caminhoOriginal: files.imagem.path,
          novoNome,
          novoCaminho,
        }

      }


      // No final faço o 'NEXT' para a minha 'REQUEST' ir para o próximo nível
      return next();

    });

  }

}


module.exports = fileUpload;
