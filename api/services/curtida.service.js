const { fornecedor, cliente, curtida } = require('../models/index');

const cria = async (fornecedorid, usuarioid) => {

  const [fornecedorDB, clienteDB] = await Promise.all([
    fornecedor.findById(fornecedorid),
    cliente.findById(usuarioid),
  ]);



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


const remove = async (fornecedorid, usuarioid) => {

  const [fornecedorDB, usuarioDB, curtidaDB] = await Promise
    .all([
      fornecedor.findById(fornecedorid),
      cliente.findById(usuarioid),
      curtida.findOne({ fornecedor: fornecedorid, cliente: usuarioid }),
    ]);

  if (!fornecedorDB) {
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: [
        "o fornecedor informado não existe"
      ]
    }
  }

  if (!curtidaDB) {
    return {
      sucesso: false,
      mensagem: "operação não pode ser realizada",
      detalhes: [
        "não existem curtidas para os dados informados"
      ]
    }
  }

  fornecedorDB.curtidas = fornecedorDB.curtidas.filter(item => {
    return item.toString() !== curtidaDB._id.toString();
  })

  const curtida_id = curtidaDB._id.toString();

  usuarioDB.curtidas = usuarioDB.curtidas.filter(item => {
    return item.toString() !== curtidaDB._id.toString()
  });

  await Promise.all([
    fornecedorDB.save(),
    usuarioDB.save(),
    curtida.remove(curtidaDB),
  ]);

  return {
    sucesso: false,
    mensagem: "operação realizada com sucesso",
    data: {
      id: curtida_id
    }
  }

}


module.exports = {
  cria,
  remove,
}
