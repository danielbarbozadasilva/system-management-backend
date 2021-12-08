const { category } = require('../models/models.index');
const categoryMapper = require('../mappers/mappers.category');
const fileUtils = require('../utils/utils.file');

const ServiceSearchAllCategory = async () => {
  const categoryDB = await category.find({}).sort({ description: 1 });
  if (categoryDB.length > 0) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: [
        categoryDB.map((item) => {
          return categoryMapper.toDTO(item);
        }),
      ],
    };
  } else {
    return {
      success: false,
      details: 'No categories found',
    };
  }
}

const ServiceSearchCategoryById = async (category_id) => {
  const categoryDB = await category.find({
    _id: Object(category_id),
  });
  if (categoryDB.length > 0) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: [categoryDB].map((item) => {
        return categoryMapper.toDTO(item);
      }),
    };
  } else {
    return {
      success: false,
      details: 'No categories found',
    };
  }
};

const ServiceInsertCategory = async (body) => {
  const categoryDB = await category.create({
    name: body.name,
    description: body.description,
    image: {
      origin: body.image.origin,
      name: body.image.newName,
      type: body.image.type,
    },
  });

  fileUtils.UtilMove(body.image.old_path, body.image.new_path);

  categoryDB.image = {
    origin: body.image.origin,
    name: body.image.newName,
    type: body.image.type,
  };

  if (categoryDB) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: categoryMapper.toDTO(categoryDB),
    };
  } else {
    return {
      success: false,
      details: 'Error updating category',
    };
  }
};

const ServiceRemoveCategoryProducts = async (category_Id) => {
  const categoryDB = await category.findOne({ _id: category_Id });

  if (!categoryDB) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ["category_id doesn't exist."],
    };
  }

  const { image } = categoryDB;

  fileUtils.UtilRemove('category', image.name);

  const deleteCategory = await category.deleteOne(categoryDB);
  if (deleteCategory) {
    return {
      success: true,
      message: 'Operation performed successfully',
    };
  } else {
    return {
      success: false,
      details: 'Error deleting category',
    };
  }
};

const ServiceUpdateCategory = async (category_Id, body) => {
  const categoryDB = await category.findOne({ _id: category_Id });
  if (!categoryDB) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ["category_id doesn't exist."],
    };
  }
  if (typeof body.image === 'object') {
    categoryDB.name = body.name;
    categoryDB.description = body.description;

    fileUtils.UtilRemove('category', categoryDB.image.name);
    fileUtils.UtilMove(body.image.old_path, body.image.new_path);
    categoryDB.image = {
      origin: body.image.origin,
      name: body.image.newName,
      type: body.image.type,
    };

    const updateCategory = await categoryDB.save();
    if (updateCategory) {
      return {
        success: true,
        message: 'Operation performed successfully',
        data: categoryMapper.toDTO(updateCategory),
      };
    }
  } else {
    return {
      success: false,
      details: 'Error updating category',
    };
  }
};

module.exports = {
  ServiceSearchAllCategory,
  ServiceSearchCategoryById,
  ServiceInsertCategory,
  ServiceRemoveCategoryProducts,
  ServiceUpdateCategory,
};
