const { usuario, fornecedor } = require("../models/index");
const criptografia = require("../utils/criptografia.util");
const usuarioMapper = require("../mappers/usuario.mapper");

const perfis = [
	{
		id: 1,
		descricao: "administrador",
		funcionalidades: [
			"ADICIONA_FORNECEDOR",
			"ATUALIZAR_FORNECEDOR",
			"PESQUISA_FORNECEDOR",
			"PESQUISA_FORNECEDOR_ID",
			"ATIVAR_FORNECEDOR",
			"INATIVAR_FORNECEDOR",
			"PESQUISA_FORNECEDOR_PRODUTO",
			"CRIA_CATEGORIA",
			"ALTERA_CATEGORIA",
			"PESQUISA_CATEGORIA",
			"REMOVE_CATEGORIA",
			"PESQUISA_CLIENTE",
		],
	},
	{
		id: 2,
		descricao: "fornecedor",
		funcionalidades: [
			"PESQUISA_FORNECEDOR_ID",
			"PESQUISA_PRODUTO",
			"CRIA_PRODUTO",
			"REMOVE_PRODUTO",
			"PESQUISA_FORNECEDOR_PRODUTO",
			"PESQUISA_CLIENTE_ID",
			"CURTIDA_CRIA",
			"CURTIR_PRODUTO",
			"REMOVE_CURTIDA_PRODUTO",
		],
	},
	{
		id: 3,
		descricao: "cliente",
		funcionalidades: ["CURTIDA_CRIA", "CURTIDA_REMOVE", "PESQUISA_FORNECEDOR_ID", "PESQUISA_FORNECEDOR_PRODUTO", "PESQUISA_CLIENTE", "PESQUISA_CLIENTE_ID"],
	},
];

const buscaTipoUsuarioPorId = (tipoUsuarioId) => {
	return perfis.find((item) => {
		return item.id === tipoUsuarioId;
	});
};

const validaSeEmailJaExiste = async (email) => {
	const usuarios = await usuario.find({ email });
	return usuarios.length > 0 ? true : false;
};

const validaSeCnpjJaExiste = async (cnpj) => {
	const result = await fornecedor.find({cnpj});
	return result.length > 0 ? true : false;
};


const criaCredencial = async (usuarioEmail) => {
	const usuarioDB = await usuario.findOne({
		email: usuarioEmail,
	});
	const usuarioDTO = usuarioMapper.toUserDTO(usuarioDB);
	return {
		token: criptografia.criaToken(usuarioDTO),
		usuarioDTO,
	};
};

const autenticar = async (email, senha) => {
	const resultadoDB = await usuarioEValido(email, senha);
	console.log(email, senha);
	if (!resultadoDB) {
		return {
			sucesso: false,
			mensagem: "não foi possivel autenticar o usuario",
			detalhes: ["usuário ou senha inválido"],
		};
	}

	return {
		sucesso: true,
		mensagem: "usuário autenticado com sucesso",
		data: await criaCredencial(email),
	};
};

const cria = async () => {
	return usuario.create({
		email: "daniel80barboza@gmail.com",
		senha: md5(`daniel${process.env.MD5_SECRET}`),
	});
};

const usuarioEValido = async (email, senha) => {
	return (await usuario.findOne({ email, senha: criptografia.criaHash(senha) })) ? true : false;
};



const buscarPefilPorId = (perfilId) => {
	const result = perfis.find((item) => Number(item.id) === Number(perfilId));
	return result;
};

const validaFuncionalidadeNoPerfil = (perfilId, funcionalidade) => {
	const perfil = buscarPefilPorId(perfilId);
	return perfil.funcionalidades.includes(funcionalidade);
};

module.exports = {
	autenticar,
	buscaTipoUsuarioPorId,
	cria,
	criaCredencial,
	validaSeCnpjJaExiste,
	validaSeEmailJaExiste,
	validaFuncionalidadeNoPerfil,
};
