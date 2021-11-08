const { admin, provider, client } = require('../../api/models/index');
const md5 = require('md5');

const createUsers = async () => {
  await admin.create({
    email: 'danielbarboza56@hotmail.com',
    name: 'admin',
    senha: md5(`daniel${process.env.MD5_SECRET}`),
  }),
    await provider.create({
      cnpj: '03.470.727/0023-36',
      fantasy_name: 'Parme',
      kind: 'provider',
      endereco: 'Rua abc,10',
      uf: 'RJ',
      cidade: 'Rio de janeiro',
      responsavel: 'Gabriel Dantas',
      telefone: '(21) 3352-1018',
      email: 'daniel80barboza@gmail.com',
      senha: md5(`daniel${process.env.MD5_SECRET}`),
      status: 'Inativo',
    }),
    await client.create({
      kind: 'client',
      name: 'Daniel',
      data_nascimento: '05/03/1997',
      uf: 'RJ',
      cidade: 'Rio de janeiro',
      email: 'daniel95barboza@gmail.com',
      senha: md5(`daniel${process.env.MD5_SECRET}`),
      status: 'Ativo',
    });
};

createUsers();
