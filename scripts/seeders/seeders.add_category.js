const { category } = require('../../api/models/models.index');
const fileUtils = require('../../api/utils/utils.file');

const createCategory = async () => {
  await category.create({
    name: 'teste-category02',
    description: 'teste-category02-description',
    status: true,
    image: {
      origin_name: 'boloLimao.jpg',
      name: fileUtils.UtilCreateName('image/jpeg'),
      type: 'image/jpeg',
    },
  });
};

createCategory();
