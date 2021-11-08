const { provider, product, client, like } = require('../models/models.index');

const crialikeclientprovider = async (providerid, clientid) => {
  const [providerDB, clientDB, likeDB] = await Promise.all([
    provider.findById(providerid),
    client.findById(clientid),
    like.findOne({ provider: providerid, client: clientid }),
  ]);

  if (!providerDB) {
    return {
      sucesso: false,
      detalhes: 'O provider informado não existe!',
    };
  } else if (!clientDB) {
    return {
      sucesso: false,
      detalhes: 'O client informado não existe!',
    };
  } else if (likeDB) {
    return {
      sucesso: false,
      detalhes: 'Você já curtiu esse provider!',
    };
  } else if (!likeDB) {
    const resp = await like.create({
      provider: providerid,
      client: clientid,
    });

    await Promise.all([resp.save()]);

    return {
      sucesso: true,
      data: {
        message: 'Curtido com sucesso!',
        id: resp._id,
        provider: resp.provider,
        client: resp.client,
      },
    };
  }
};

const removelikeclientprovider = async (providerid, clientid) => {
  const [providerDB, clientDB, likeDB] = await Promise.all([
    provider.findById(providerid),
    client.findById(clientid),
    like.findOne({ provider: providerid, client: clientid }),
  ]);

  if (!providerDB) {
    return {
      sucesso: false,
      detalhes: 'O provider informado não existe!',
    };
  } else if (!clientDB) {
    return {
      sucesso: false,
      detalhes: 'O client informado não existe!',
    };
  } else if (likeDB) {
    await Promise.all([like.deleteOne()]);

    return {
      sucesso: true,
      data: {
        message: 'like excluída com sucesso!',
      },
    };
  } else if (!likeDB) {
    return {
      sucesso: false,
      detalhes: 'Nenhuma like para excluir!',
    };
  }
};

const crialikeproviderproduct = async (providerid, productid) => {
  const [providerDB, productDB, likeDB] = await Promise.all([
    provider.findById(providerid),
    product.findById(productid),
    like.findOne({ provider: providerid, product: productid }),
  ]);

  if (!providerDB) {
    return {
      sucesso: false,
      detalhes: 'O provider informado não existe!',
    };
  } else if (!productDB) {
    return {
      sucesso: false,
      detalhes: 'O product informado não existe!',
    };
  } else if (likeDB) {
    return {
      sucesso: false,
      detalhes: 'O provider já curtiu o product!',
    };
  } else if (!likeDB) {
    const resp = await like.create({
      provider: providerid,
      product: productid,
    });

    await Promise.all([resp.save()]);

    return {
      sucesso: true,
      data: {
        message: 'Curtido com sucesso!',
        id: resp._id,
        provider: resp.provider,
        product: resp.product,
      },
    };
  }
};

const removelikeproviderproduct = async (providerid, productid) => {
  const [providerDB, productDB, likeDB] = await Promise.all([
    provider.findById(providerid),
    product.findById(productid),
    like.findOne({ provider: providerid, product: productid }),
  ]);

  if (!providerDB) {
    return {
      sucesso: false,
      detalhes: 'O provider informado não existe!',
    };
  } else if (!productDB) {
    return {
      sucesso: false,
      detalhes: 'O product informado não existe!',
    };
  } else if (likeDB) {
    await Promise.all([like.deleteOne()]);
    return {
      sucesso: true,
      data: {
        message: 'like excluída com sucesso!',
      },
    };
  } else if (!likeDB) {
    return {
      sucesso: false,
      detalhes: 'Nenhuma like para excluir!',
    };
  }
};

module.exports = {
  crialikeclientprovider,
  removelikeclientprovider,
  crialikeproviderproduct,
  removelikeproviderproduct,
};
