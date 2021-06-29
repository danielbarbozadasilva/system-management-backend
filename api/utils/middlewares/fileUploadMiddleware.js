const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const fileUtils = require("../file.util");

const fileUpload = (destino, isUpdate = false) => {
  const form = formidable.IncomingForm();
  form.uploadDir = fileUtils.criaEndereco("temp");

  return (req, res, next) => {
    form.parse(req, (err, fields, files) => {
      req.body = { ...fields };

      if (!files.imagem && !isUpdate) {
        return res.status(400).send({
          mensagem: "não foi possível realizar a operação",
          detalhes: ['"imagem" é de preenchimento obrigatório.'],
        });
      }

      if (files.imagem) {
        const novoNome = fileUtils.criaNome(files.imagem.type);
        const novoCaminho = fileUtils.criaEndereco(destino, novoNome);

        req.body.imagem = {
          tipo: files.imagem.type,
          nomeOriginal: files.imagem.name,
          caminhoOriginal: files.imagem.path,
          novoNome,
          novoCaminho,
        };
      }
      return next();
    });
  };
};

module.exports = fileUpload;
