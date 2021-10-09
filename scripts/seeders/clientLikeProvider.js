const { curtida } = require("../../api/models/index");

const dataLike = [
	{
		idClient: "615a19fd4384691888d27098",
		idProvider: "615a584a79b274425a6fa7db",
	},
	{
		idClient: "615cce324b51ba2b14c1b170",
		idProvider: "615a584a79b274425a6fa7db"
	},
];

const createLike = async () => {
	await curtida.create(dataLike);
};

createLike();
