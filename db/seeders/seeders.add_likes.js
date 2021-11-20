const { like } = require('../../api/models/models.index');

const createLike = async () => {
  const resultDB = await like.create(
    {
      client: Object('615a19fd4384691888d27098'),
      provider: Object('615a584a79b274425a6fa7db'),
    },
    {
      client: Object('615cce324b51ba2b14c1b190'),
      provider: Object('615a584a79b274425a6fa7dc'),
    },
    {
      provider: Object('615a584a79b274425a6fa7db'),
      product: Object('6164ecf0912afe7ae51bf6a7'),
    },
    {
      provider: Object('615a584a79b274425a6fa7dc'),
      product: Object('6164ecf0912afe7ae51bf6a8'),
    }
  );
  if (resultDB) {
    return {
      success: true,
      message: 'the likes have been successfully added.',
      data: resultDB,
    };
  } else {
    return {
      success: false,
      message: 'could not perform the operation',
    };
  }
};

const removeLike = async () => {
  const resultDB = await like.deleteMany({});

  if (resultDB.ok == 1) {
    return {
      success: true,
      message: 'the likes were successfully removed.',
      data: resultDB,
    };
  } else {
    return {
      success: false,
      message: 'it is not possible to remove the likes',
    };
  }
};

module.exports = { createLike, removeLike };
