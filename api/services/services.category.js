const { category } = require('../models/models.index');
const categoryMapper = require('../mappers/mappers.category');
const fileUtils = require('../utils/utils.file');
const ErrorBusinessRule = require('../utils/errors/errors.business_rule');

const ServiceSearchAllCategory = async () => {
  const categoryDB = await category.find({}).sort({ description: 1 });
  if (categoryDB) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: categoryMapper.toDTO(...categoryDB),
    };
  } else {
    return {
      success: false,
      details: 'No categories found',
    };
  }
};

const ServiceSearchCategoryById = async (category_id) => {
  const categoryDB = await category.findById(category_id);
  if (categoryDB) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: categoryMapper.toDTO(categoryDB),
    };
  } else {
    return {
      success: false,
      details: 'No categories found',
    };
  }
};

const ServiceInsertCategory = async (model) => {
  const newCategory = await category.create({
    name: model.name,
    description: model.description,
    image: {
      origin: model.image.origin,
      name: model.image.newName,
      type: model.image.type,
    },
  });

  fileUtils.UtilMove(model.image.old_path, model.image.new_path);

  return {
    success: true,
    message: 'Operation performed successfully',
    data: categoryMapper.toDTO(newCategory),
  };
};

const ServiceRemoveCategoryProducts = async (category_Id) => {
  const categoryDB = await category.findOne({ _id: category_Id });

  if (!categoryDB) {
    new ErrorBusinessRule('category not found!');
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

const ServiceUpdateCategory = async (category_Id, model) => {
  const categoryDB = await category.findOne({ _id: category_Id });
  if (!categoryDB) {
    return {
      success: false,
      message: 'could not perform the operation',
      details: ["category_id doesn't exist."],
    };
  }

  categoryDB.name = model.name;
  categoryDB.description = model.description;
  categoryDB.status = model.status;

  if (typeof model.image === 'object') {
    fileUtils.UtilRemove('category', categoryDB.image.name);
    fileUtils.UtilMove(model.image.old_path, model.image.new_path);
    categoryDB.image = {
      origin: model.image.origin,
      name: model.image.newName,
      type: model.image.type,
    };
  }

  const updateCategory = await categoryDB.save();
  if (updateCategory) {
    return {
      success: true,
      message: 'success',
      data: categoryMapper.toDTO(...categoryDB),
    };
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
