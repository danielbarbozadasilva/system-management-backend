const { Router } = require('express');
const { name, version } = require('../../package.json');


const routesV1Usuarios = require('./v1/usuario');

module.exports = (app) => {

  app.get('/', (req, res, next) => {
    res.send({ name, version });
  });

  const routesV1 = Router();

  routesV1Usuarios(routesV1);

  app.use('/v1', routesV1);

}
