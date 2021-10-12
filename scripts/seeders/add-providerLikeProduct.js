const { curtida } = require("../../api/models/index");

const dataLike = [
	{
		fornecedor: "615a584a79b274425a6fa7db",
		produto: "6164ecf0912afe7ae51bf6a7",
	},
	{
		fornecedor: "615a584a79b274425a6fa7db",
		produto: "6164ecf0912afe7ae51bf6a8",
	},
];

const createLike = async () => {
	await curtida.create(dataLike);
};

createLike();
