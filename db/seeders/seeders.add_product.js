const { product } = require('../../api/models/models.index');
const fileUtils = require('../../api/utils/utils.file');

const createProduct = async () => {
  const resultDB = await product.create(
    {
      _id: Object('6164ecf0912afe7ae51bf6a7'),
      category: Object('615a19fd4384691888d27098'),
      provider: Object('615a584a79b274425a6fa7db'),
      name: 'teste-product01',
      description: 'teste-product01-description',
      price: 13.55,
      image: {
        sourceFile: 'boloLimao.jpg',
        name: fileUtils.UtilCreateName('image/jpeg'),
        type: 'image/jpeg',
      },
    },
    {
      _id: Object('6164ecf0912afe7ae51bf6a8'),
      category: Object('61611e6ff0c5860e72da8757'),
      provider: Object('615a584a79b274425a6fa7dc'),
      name: 'teste-product02',
      description: 'teste-product02-description',
      price: 20.95,
      image: {
        sourceFile: 'principal2.jpg',
        name: fileUtils.UtilCreateName('image/jpeg'),
        type: 'image/jpeg',
      },
    }
  );
  if (resultDB) {
    return {
      success: true,
      message: 'the products have been successfully added.',
      data: resultDB,
    };
  } else {
    return {
      success: false,
      message: 'it is not possible to add the products',
    };
  }
};

const removeProduct = async () => {
  const resultDB = await product.deleteMany({});

  if (resultDB.ok == 1) {
    return {
      success: true,
      message: 'the products were successfully removed.',
    }
  }
}

module.exports = { createProduct, removeProduct };
