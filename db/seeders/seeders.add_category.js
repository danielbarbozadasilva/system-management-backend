const { category } = require('../../api/models/models.index');
const fileUtils = require('../../api/utils/utils.file');

const createCategory = async () => {
  const resultDB = await category.create(
    {
      _id: Object('615a19fd4384691888d27098'),
      name: 'teste-category01',
      description: 'teste-category01-description',
      image: {
        sourceFile: 'boloLimao.jpg',
        name: fileUtils.UtilCreateName('image/jpeg'),
        type: 'image/jpeg',
      },
    },
    {
      _id: Object('61611e6ff0c5860e72da8757'),
      name: 'teste-category02',
      description: 'teste-category02-description',
      image: {
        sourceFile: 'boloLimao.jpg',
        name: fileUtils.UtilCreateName('image/jpeg'),
        type: 'image/jpeg',
      },
    }
  );

  if (resultDB) {
    return {
      success: true,
      message: 'the categories have been successfully added.',
      data: resultDB,
    };
  } else {
    return {
      success: false,
      message: 'error when inserting to categories',
    };
  }
};

const removeCategory = async () => {
  const resultDB = await category.deleteMany({});

  if (resultDB.ok==1) {
    return {
      success: true,
      message: 'the categories were successfully removed.',
      data: resultDB,
    };
  } else {
    return {
      success: false,
      message: 'it is not possible to remove the categories',
    };
  }
};
module.exports = { createCategory, removeCategory };
