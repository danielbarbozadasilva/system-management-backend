const path = require('path');
const enderecoRaiz = process.env.FILE_BASE_PATH;
const uuid = require('uuid').v4;


const criaEndereco = (destino, arquivoNome) =>{

    // retorna o endereço do meu arquivo
    return path.join(enderecoRaiz, destino, arquivoNome);
}

const criaNome = (tipo) => {
    // quando recebo do front ele vem image/imagem.png (pego o final do arquivo)
    const tipoTratado = splite('/')[1];
    return `${uuid()}.${tipoTratado}`;
}

const move = (temporario, definitivo) => {
    return fs.renameSync(temporario, definitivo);
  }
  
  module.exports = {
    criaEndereco,
    criaNome,
    move,
    // remove,
  }
  