const { admin, provider, client } = require('../../api/models/index');
const md5 = require('md5');

const createUsers = async () => {
  const [adminDB, providerDB, clientDB] = await Promise.all([
    await admin.create({
      email: 'danielbarboza56@hotmail.com',
      name: 'admin',
      password: md5(`daniel${process.env.MD5_SECRET}`),
    }),
    await provider.create({
      cnpj: '03.470.727/0023-36',
      fantasy_name: 'Parme',
      kind: 'provider',
      address: 'Rua abc,10',
      uf: 'RJ',
      city: 'Rio de janeiro',
      responsible: 'Gabriel Dantas',
      phone: '(21) 3352-1018',
      email: 'daniel80barboza@gmail.com',
      password: md5(`daniel${process.env.MD5_SECRET}`),
      status: 'Enable',
    }),
    await client.create({
      kind: 'client',
      name: 'Daniel',
      date: '05/03/1997',
      uf: 'RJ',
      city: 'Rio de janeiro',
      email: 'daniel95barboza@gmail.com',
      password: md5(`daniel${process.env.MD5_SECRET}`),
      status: 'Enable',
    }),
  ]);

  if (!adminDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['Error performing the operation'],
    };
  }

  if (!providerDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['Error performing the operation'],
    };
  }

  if (!clientDB) {
    return {
      success: false,
      message: 'Operation cannot be performed',
      details: ['Error performing the operation'],
    };
  }

  return {
    success: true,
    message: 'Operation performed successfully!',
    data: productMapper.toItemListaDTO(productDB),
  };
};

createUsers();
