const path = require('path');
const enderecoRaiz = process.env.FILE_BASE_PATH;
const moment = require('moment');
const fs = require('fs');
const uuid = require('uuid').v4;


/* Cria o endereço apartir de um endereço raiz, 
passando o destino e o nome do arquivo(caso seja relevante)  */
const criaEndereco = (destino, arquivoNome = "") => {

    // retorna o endereço do meu arquivo
  return path.join(enderecoRaiz, destino, arquivoNome);
}

/* Função que cria o endereço para download */
const criaEnderecoDownload = (origem, arquivoNome) => {
  return path.join('/static', origem, arquivoNome);
}

const criaNome = (tipo) => {
  const tipoTratado = tipo.split('/')[1];
  return `${uuid()}.${tipoTratado}`;
}

/* Move o arquivo */ 
const move = (temporario, definitivo) => {
  return fs.renameSync(temporario, definitivo);
}

const remove = (origem, arquivo) => {
  const enderecoArquivo = criaEndereco(origem, arquivo);
  // Verifica se existe, em caso afirmativo ele remove 
  if (fs.existsSync(enderecoArquivo))
    fs.unlinkSync(enderecoArquivo);

  return;
}


module.exports = {
  criaEndereco,
  criaEnderecoDownload,
  criaNome,
  move,
  remove
}
