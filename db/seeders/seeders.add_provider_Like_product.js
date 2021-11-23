const { like } = require('../../api/models/models.index');

const dataLike = [
  {
    provider: '615a584a79b274425a6fa7db',
    product: '6164ecf0912afe7ae51bf6a7',
  },
  {
    provider: '615a584a79b274425a6fa7db',
    product: '6164ecf0912afe7ae51bf6a8',
  },
];

const createLike = async () => {
  const resultDB = await like.create(dataLike);
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
module.exports = { createLike };