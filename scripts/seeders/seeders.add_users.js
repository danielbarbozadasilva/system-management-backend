const { admin, provider, client } = require('../../api/models/index');
const md5 = require('md5');

const createUsers = async () => {
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
      status: 'INACTIVATE',
    }),
    await client.create({
      kind: 'client',
      name: 'Daniel',
      date: '05/03/1997',
      uf: 'RJ',
      cidade: 'Rio de janeiro',
      email: 'daniel95barboza@gmail.com',
      password: md5(`daniel${process.env.MD5_SECRET}`),
      status: 'Active',
    });
};

createUsers();
