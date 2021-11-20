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
    await provider.create(
      {
        _id: Object('615a584a79b274425a6fa7db'),
        kind: 'provider',
        cnpj: '03.470.727/0023-36',
        fantasy_name: 'Parme',
        social_name: 'Parme etc.',
        address: 'Rua abc, 10',
        uf: 'RJ',
        city: 'RIO DE JANEIRO',
        responsible: 'Daniel Barboza',
        phone: '(21)3352-1018',
        email: 'daniel80barboza@gmail.com',
        password: md5(`daniel${process.env.MD5_SECRET}`),
        status: 'enable',
      },
      {
        _id: Object('615a584a79b274425a6fa7dc'),
        kind: 'provider',
        cnpj: '11.470.727/0023-21',
        fantasy_name: 'Mc Donalds',
        social_name: 'Mc Donalds etc.',
        address: 'Rua xyz, 11',
        uf: 'RJ',
        city: 'CARMO',
        responsible: 'Marcelo Barboza',
        phone: '(21)2452-9911',
        email: 'daniel90barboza@gmail.com',
        password: md5(`daniel${process.env.MD5_SECRET}`),
        status: 'enable',
      }
    ),
    await client.create(
      {
        _id: Object('615cce324b51ba2b14c1b170'),
        kind: 'client',
        first_name: 'Daniel',
        last_name: 'Silva',
        birth_date: '05/03/1997',
        phone: '(21)9987-4178',
        uf: 'RJ',
        city: 'RIO DE JANEIRO',
        email: 'daniel95barboza@gmail.com',
        password: md5(`daniel${process.env.MD5_SECRET}`),
        status: 'enable',
      },
      {
        _id: Object('615cce324b51ba2b14c1b190'),
        kind: 'client',
        first_name: 'Rafael',
        last_name: 'Duarte',
        birth_date: '01/03/1990',
        phone: '(21)8987-4178',
        uf: 'RJ',
        city: 'CARMO',
        email: 'daniel59barboza@gmail.com',
        password: md5(`daniel${process.env.MD5_SECRET}`),
        status: 'enable',
      }
    ),
  ]);

  if (!adminDB) {
    return {
      success: false,
      message: 'it is not possible to add the admin',
      details: ['Error performing the operation'],
    };
  }

  if (!providerDB) {
    return {
      success: false,
      message: 'it is not possible to add the provider',
      details: ['Error performing the operation'],
    };
  }

  if (!clientDB) {
    return {
      success: false,
      message: 'it is not possible to add the client',
      details: ['Error performing the operation'],
    };
  }

  return {
    success: true,
    message: 'the users have been successfully added.',
  };
};

const removeUsers = async () => {
  const resultDBAdmin = await admin.deleteMany({});
  const resultDBProvider = await provider.deleteMany({});
  const resultDBClient = await client.deleteMany({});

  if (
    resultDBAdmin.ok == 1 &&
    resultDBProvider.ok == 1 &&
    resultDBClient.ok == 1
  ) {
    return {
      success: true,
      message: 'the users were successfully removed.',
    };
  } else if (
    resultDBAdmin.ok !== 1 ||
    resultDBProvider.ok !== 1 ||
    resultDBClient.ok !== 1
  ) {
    return {
      success: false,
      message: 'it is not possible to remove the users',
      details: ['Error performing the operation'],
    };
  }
};

module.exports = { createUsers, removeUsers };
