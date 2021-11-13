const { product } = require('../../api/models/models.index');
const fileUtils = require('../../api/utils/utils.file');

const dataProduct = [
  {
    category: '615a19fd4384691888d27098',
    provider: '615a584a79b274425a6fa7db',
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
    category: '61611e6ff0c5860e72da8757',
    provider: '615a584a79b274425a6fa7db',
    name: 'teste-product02',
    description: 'teste-product02-description',
    price: 20.95,
    image: {
      sourceFile: 'principal2.jpg',
      name: fileUtils.UtilCreateName('image/jpeg'),
      type: 'image/jpeg',
    },
  },
];

const createProduct = async () => {
  const resultDB = await product.create(dataProduct);
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

createProduct();
