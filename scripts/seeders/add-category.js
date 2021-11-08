const { category } = require("../../api/models/index");
const fileUtils = require("../../api/utils/file.util");

const createCategory = async () => {
  await category.create({
    name: "teste-category02",
    description: "teste-category02-description",
    status: true,
    image: {
      originalName: "boloLimao.jpg",
      name: fileUtils.createName("image/jpeg"),
      type: "image/jpeg",
    },
  });
};

createCategory();
