const { category } = require('../../api/models/models.index');
const fileUtils = require('../../api/utils/utils.file');

const createCategory = async () => {
  const resultDB = await category.create({
    name: 'teste-category02',
    description: 'teste-category02-description',
    image: {
      sourceFile: 'boloLimao.jpg',
      name: fileUtils.UtilCreateName('image/jpeg'),
      type: 'image/jpeg',
    },
  });
   if (resultDB) {
     return {
       success: true,
       message: 'Operation performed successfully',
       data: resultDB,
     };
   } else {
     return {
       success: false,
       message: 'could not perform the operation',
     };
   }
};
module.exports = { createCategory };