const { Router } = require('express');
const { name, version } = require('../../package.json');

const routesV1User = require('./v1/routes.v1.user');
const routesV1Category = require('./v1/routes.v1.category');
const routesV1Provider = require('./v1/routes.v1.provider');
const routesV1Product = require('./v1/routes.v1.product');
const routesV1Client = require('./v1/routes.v1.client');

module.exports = (app) => {
  app.get('/', (req, res, next) => {
    res.send({ name, version });
  });

  const routesV1 = Router();

  routesV1User(routesV1);
  routesV1Category(routesV1);
  routesV1Provider(routesV1);
  routesV1Product(routesV1);
  routesV1Client(routesV1);

  app.use('/v1', routesV1);
};
