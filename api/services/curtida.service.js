const { fornecedor, cliente, curtida } = require('../models/index');

const cria = async (fornecedorid, usuarioid) => {



  const [fornecedorDB, clienteDB] = await Promise.all([
    fornecedor.findById(fornecedorid),
    cliente.findById(usuarioid),
  ]);


  // fornecedor existe
  // remover validacao para uma camada separada e reaproveitar
  if (!fornecedorDB) {
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: [
        "o fornecedor pesquisado não existe"
      ]
    }
  }

  const curtidaDB = await curtida.create({
    fornecedor: fornecedorid,
    cliente: usuarioid,
  });

  fornecedorDB.curtidas = [...fornecedorDB.curtidas, curtidaDB._id];
  clienteDB.curtidas = [...clienteDB.curtidas, curtidaDB._id];

  await Promise.all([
    fornecedorDB.save(),
    clienteDB.save()
  ]);

  return {
    sucesso: true,
    data: {
      id: curtidaDB._id,
      fornecedor: fornecedorDB.nomeFantasia,
      cliente: clienteDB.nome,
    }
  }

};


module.exports = {

  cria,

}
