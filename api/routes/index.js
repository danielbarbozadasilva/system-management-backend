/* Arquivo central de rotas, responsável pela associação de todas
as rotas contruídas seguimentadas por negórcio e o contexto do negócio */

const { Router } = require('express');
const { name, version } = require('../../package.json');

/* É necessário expor uma rota de autenticação de usuários */
const routesV1Usuarios = require('./v1/usuario');

/* Manter Categoria - todas as operações que representam o CRUD */
const routesV1Categorias = require('./v1/categoria');

/* Manter Fornecedores - todas as operações que representam o CRUD */
const routesV1Fornecedores = require('./v1/fornecedores');

/* Manter Produtos - todas as operações que representam o CRUD */
const routesV1Produtos = require('./v1/produtos');

const routesV1Cliente = require('./v1/cliente');


module.exports = (app) => {

  app.get('/', (req, res, next) => {
    res.send({ name, version });
  });

  const routesV1 = Router();

  routesV1Usuarios(routesV1);
  routesV1Categorias(routesV1);
  routesV1Fornecedores(routesV1);
  routesV1Produtos(routesV1);
  routesV1Cliente(routesV1);

  app.use('/v1', routesV1);

}