const { like } = require('../../api/models/index');

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
  await like.create(dataLike);
};

createLike();
