#!/bin/bash

set -e

mongo <<EOF
use admin 
db.createUser(
  {
    user: ${MONGO_USER},
    pwd: ${MONGO_PASS},
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)

use ${MONGO_DB_NAME}
db.createCollection("usersCollection")
db.usersCollection.insert([
  {
    _id: ObjectId('62fc635ea0eee6e7c8ac263e'),
    kind: 'admin',
    email: 'danielbarboza56@hotmail.com',
    name: 'Daniel Barboza',
    password: '37007245b64245f0647f692ae8ac2087'
  },
  {
    _id: ObjectId('615a584a79b274425a6fa7db'),
    kind: 'provider',
    cnpj: '03.470.727/0023-36',
    fantasyName: 'Parme',
    socialName: 'Parme etc.',
    address: 'Rua abc, 10',
    uf: 'RJ',
    city: 'RIO DE JANEIRO',
    responsible: 'Daniel Barboza',
    phone: '(21)3352-1018',
    email: 'daniel80barboza@gmail.com',
    password: '37007245b64245f0647f692ae8ac2087',
    status: 'ENABLE',
    likes: [ObjectId('6164ecf0912afe7ae51bf6a7')]
  },
  {
    _id: ObjectId('615a584a79b274425a6fa7dc'),
    kind: 'provider',
    cnpj: '11.470.727/0023-21',
    fantasyName: 'Mc Donalds',
    socialName: 'Mc Donalds etc.',
    address: 'Rua xyz, 11',
    uf: 'RJ',
    city: 'CARMO',
    responsible: 'Marcelo Barboza',
    phone: '(21)2452-9911',
    email: 'daniel90barboza@gmail.com',
    password: '37007245b64245f0647f692ae8ac2087',
    status: 'ENABLE',
    likes: [ObjectId('6164ecf0912afe7ae51bf6a8')]
  },
  {
    _id: ObjectId('615cce324b51ba2b14c1b170'),
    kind: 'client',
    firstName: 'Daniel',
    lastName: 'Silva',
    birthDate: '05/03/1997',
    phone: '(21)9987-4178',
    uf: 'RJ',
    city: 'RIO DE JANEIRO',
    email: 'daniel95barboza@gmail.com',
    password: '37007245b64245f0647f692ae8ac2087',
    status: 'ENABLE',
    likes: [ObjectId('615a584a79b274425a6fa7db')]
  },
  {
    _id: ObjectId('615cce324b51ba2b14c1b190'),
    kind: 'client',
    firstName: 'Rafael',
    lastName: 'Duarte',
    birthDate: '01/03/1990',
    phone: '(21)8987-4178',
    uf: 'RJ',
    city: 'CARMO',
    email: 'daniel59barboza@gmail.com',
    password: '37007245b64245f0647f692ae8ac2087',
    status: 'ENABLE',
    likes: [ObjectId('615a584a79b274425a6fa7db')]
  }
])

db.createCollection("categoryCollection")
db.categoryCollection.insert([
  {
      _id: ObjectId('615a19fd4384691888d27098'),
      name: 'Bolos',
      description: 'experimente nossos deliciosos bolos...',
      image: {
        origin: 'img01.jpeg',
        name: '76b163b0-742f-4dd4-b916-0e5ffdaae813.jpeg',
        type: 'image/jpg'
      }
    },
    {
      _id: ObjectId('61611e6ff0c5860e72da8757'),
      name: 'Pizzas',
      description: 'experimente nossas deliciosas pizzas...',
      image: {
        origin: 'img02.jpeg',
        name: 'fd2b3f20-2e43-4ffe-8cfe-daa5444c5b86.jpeg',
        type: 'image/jpeg'
      }
    }
])

db.createCollection("productCollection")
db.productCollection.insert([
  {
      _id: ObjectId('6164ecf0912afe7ae51bf6a7'),
      category: ObjectId('615a19fd4384691888d27098'),
      provider: ObjectId('615a584a79b274425a6fa7db'),
      name: 'Bolo de Chocolate',
      description: 'Um bolo delicioso de chocolate...',
      price: 13.55,
      image: {
        origin: 'img03.jpeg',
        name: 'd5b699f0-c303-438b-9d08-5abc5849124d.jpeg',
        type: 'image/jpeg'
      }
    },
    {
      _id: ObjectId('6164ecf0912afe7ae51bf6a8'),
      category: ObjectId('61611e6ff0c5860e72da8757'),
      provider: ObjectId('615a584a79b274425a6fa7dc'),
      name: 'Pizza de Calabresa',
      description: 'Uma deliciosa pizza de calabresa...',
      price: 20.95,
      image: {
        origin: 'img04.jpeg',
        name: 'ee659763-1406-442f-a03b-8ecb8e443145.jpeg',
        type: 'image/jpeg'
      }
    }
])
EOF
