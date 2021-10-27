const { Router } = require("express");
const { name, version } = require("../../package.json");

const routesV1Usuarios = require("./v1/usuario");
const routesV1Categorias = require("./v1/categoria");
const routesV1fornecedores = require("./v1/fornecedores");
const routesV1Produtos = require("./v1/produtos");
const routesV1Cliente = require("./v1/cliente");

module.exports = (app) => {
  app.get("/", (req, res, next) => {
    res.send({ name, version });
  });

  const routesV1 = Router();

  routesV1Usuarios(routesV1);
  routesV1Categorias(routesV1);
  routesV1fornecedores(routesV1);
  routesV1Produtos(routesV1);
  routesV1Cliente(routesV1);

  app.use("/v1", routesV1);
};
