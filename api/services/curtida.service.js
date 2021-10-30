const { fornecedor, produto, cliente, curtida } = require("../models/index");

const criaCurtidaClienteFornecedor = async (fornecedorid, clienteid) => {
  const [fornecedorDB, clienteDB, curtidaDB] = await Promise.all([
    fornecedor.findById(fornecedorid),
    cliente.findById(clienteid),
    curtida.findOne({ fornecedor: fornecedorid, cliente: clienteid }),
  ]);

  if (!fornecedorDB) {
    return {
      sucesso: false,
      detalhes: "O fornecedor informado não existe!",
    };
  } else if (!clienteDB) {
    return {
      sucesso: false,
      detalhes: "O cliente informado não existe!",
    };
  } else if (curtidaDB) {
    return {
      sucesso: false,
      detalhes: "Você já curtiu esse fornecedor!",
    };
  } else if (!curtidaDB) {
    const resp = await curtida.create({
      fornecedor: fornecedorid,
      cliente: clienteid,
    });

    await Promise.all([resp.save()]);

    return {
      sucesso: true,
      data: {
        message: "Curtido com sucesso!",
        id: resp._id,
        fornecedor: resp.fornecedor,
        cliente: resp.cliente,
      },
    };
  }
};

const removeCurtidaClienteFornecedor = async (fornecedorid, clienteid) => {
  const [fornecedorDB, clienteDB, curtidaDB] = await Promise.all([
    fornecedor.findById(fornecedorid),
    cliente.findById(clienteid),
    curtida.findOne({ fornecedor: fornecedorid, cliente: clienteid }),
  ]);

  if (!fornecedorDB) {
    return {
      sucesso: false,
      detalhes: "O fornecedor informado não existe!",
    };
  } else if (!clienteDB) {
    return {
      sucesso: false,
      detalhes: "O cliente informado não existe!",
    };
  } else if (curtidaDB) {
    await Promise.all([curtida.deleteOne()]);

    return {
      sucesso: true,
      data: {
        message: "Curtida excluída com sucesso!",
      },
    };
  } else if (!curtidaDB) {
    return {
      sucesso: false,
      detalhes: "Nenhuma curtida para excluír!"
    }
  }
};

const criaCurtidaFornecedorProduto = async (fornecedorid, produtoid) => {
  const [fornecedorDB, produtoDB, curtidaDB] = await Promise.all([
    fornecedor.findById(fornecedorid),
    produto.findById(produtoid),
    curtida.findOne({ fornecedor: fornecedorid, produto: produtoid }),
  ]);

  if (!fornecedorDB) {
    return {
      sucesso: false,
      detalhes: "O fornecedor informado não existe!",
    };
  } else if (!produtoDB) {
    return {
      sucesso: false,
      detalhes: "O produto informado não existe!",
    };
  } else if (curtidaDB) {
    return {
      sucesso: false,
      detalhes: "O fornecedor já curtiu o produto!",
    };
  } else if (!curtidaDB) {
    const resp = await curtida.create({
      fornecedor: fornecedorid,
      produto: produtoid,
    });

    await Promise.all([resp.save()]);

    return {
      sucesso: true,
      data: {
        message: "Curtido com sucesso!",
        id: resp._id,
        fornecedor: resp.fornecedor,
        produto: resp.produto,
      },
    };
  }
};

const removeCurtidaFornecedorProduto = async (fornecedorid, produtoid) => {
  const [fornecedorDB, produtoDB, curtidaDB] = await Promise.all([
    fornecedor.findById(fornecedorid),
    produto.findById(produtoid),
    curtida.findOne({ fornecedor: fornecedorid, produto: produtoid }),
  ]);

  if (!fornecedorDB) {
    return {
      sucesso: false,
      detalhes: "O fornecedor informado não existe!",
    };
  } else if (!produtoDB) {
    return {
      sucesso: false,
      detalhes: "O produto informado não existe!",
    };
  } else if (curtidaDB) {
    await Promise.all([curtida.deleteOne()]);
    return {
      sucesso: true,
      data: {
        message: "Curtida excluída com sucesso!",
      },
    };
  } else if (!curtidaDB) {
    return {
      sucesso: false,
      detalhes: "Nenhuma curtida para excluír!"
    }
  
  };

};

module.exports = {
  criaCurtidaClienteFornecedor,
  removeCurtidaClienteFornecedor,
  criaCurtidaFornecedorProduto,
  removeCurtidaFornecedorProduto,
};
