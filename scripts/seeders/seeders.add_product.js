const { product } = require('../../api/models/models.index');
const fileUtils = require('../../api/utils/utils.file');

const dataProduct = [
  {
    category: '615a19fd4384691888d27098',
    provider: '615a584a79b274425a6fa7db',
    name: 'teste-product01',
    description: 'teste-product01-description',
    preco: 13.55,
    image: {
      origin_name: 'boloLimao.jpg',
      name: fileUtils.UtilCreateName('image/jpeg'),
      type: 'image/jpeg',
    },
  },
  {
    category: '61611e6ff0c5860e72da8757',
    provider: '615a584a79b274425a6fa7db',
    name: 'teste-product02',
    description: 'teste-product02-description',
    preco: 20.95,
    image: {
      origin_name: 'principal2.jpg',
      name: fileUtils.UtilCreateName('image/jpeg'),
      type: 'image/jpeg',
    },
  },
];

const createProduct = async () => {
  await product.create(dataProduct);
};

createProduct();
