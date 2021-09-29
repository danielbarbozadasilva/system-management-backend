const path = require("path");
const enderecoRaiz = process.env.FILE_BASE_PATH;
const moment = require("moment");
const fs = require("fs");
const uuid = require("uuid").v4;

const criaEndereco = (destino, arquivoNome = "") => {
	return path.join(enderecoRaiz, destino, arquivoNome);
};

const criaEnderecoDownload = (origem, arquivoNome) => {
	return path.join("/static", origem, arquivoNome);
};

const criaNome = (tipo) => {
	const tipoTratado = tipo.split("/")[1];
	return `${uuid()}.${tipoTratado}`;
};

const move = (temporario, definitivo) => {
	return fs.renameSync(temporario, definitivo);
};

const remove = (origem, arquivo) => {
	const enderecoArquivo = criaEndereco(origem, arquivo);

	if (fs.existsSync(enderecoArquivo)) fs.unlinkSync(enderecoArquivo);

	return;
};

module.exports = {
	criaEndereco,
	criaEnderecoDownload,
	criaNome,
	move,
	remove,
};
