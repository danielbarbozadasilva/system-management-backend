const { admin, provider, client } = require('../../api/models/models.index');
const md5 = require('md5');

const createUsers = async () => {
  const [adminDB, providerDB, clientDB] = await Promise.all([
    await admin.create({
      kind: 'admin',
      email: 'danielbarboza56@hotmail.com',
      name: 'admin',
      password: md5(`daniel${process.env.MD5_SECRET}`),
    }),
    await provider.create({
      kind: 'provider',
      cnpj: '03.470.727/0023-36',
      fantasy_name: 'Parme',
      social_name: 'Parme etc.',
      address: 'Rua abc, 10',
      uf: 'RJ',
      city: 'Rio de janeiro',
      responsible: 'Daniel Barboza',
      phone: '(21)3352-1018',
      email: 'daniel80barboza@gmail.com',
      password: md5(`daniel${process.env.MD5_SECRET}`),
      status: 'enable',
    }),
    await client.create({
      kind: 'client',
      first_name: 'Daniel',
      last_name: 'Silva',
      birth_date: '05/03/1997',
      phone:'(21)9987-4178',
      uf: 'RJ',
      city: 'Rio de janeiro',
      email: 'daniel95barboza@gmail.com',
      password: md5(`daniel${process.env.MD5_SECRET}`),
      status: 'enable',
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
  };
};
module.exports = { createUsers };