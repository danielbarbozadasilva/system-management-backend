const { category } = require('../models/models.index');
const categoryMapper = require('../mappers/mappers.category');
const fileUtils = require('../utils/utils.file');

const ServiceSearchAllCategory = async () => {
  const categoryDB = await category.find({}).sort({ description: 1 });
  if (categoryDB) {
    return {
      success: true,
      message: 'Operation performed successfully',
      data: categoryDB,
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
      data: categoryDB,
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
      sourceFile: model.image.sourceFile,
      name: model.image.name,
      type: model.image.type,
    },
  });

  fileUtils.UtilMove(model.image.oldPath, model.image.newPath);

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
  fileUtils.remove('category', image.name);

  await category.deleteOne(categoryDB);

  return {
    success: true,
    message: 'Operation performed successfully!',
  };
};

const ServiceChangeCategory = async (category_Id, model) => {
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
    fileUtils.remove('category', categoryDB.image.name);
    fileUtils.move(model.image.old_source, model.image.new_source);
    categoryDB.image = {
      sourceFile: model.image.sourceFile,
      name: model.image.newName,
      type: model.image.type,
    };
  }

  await categoryDB.save();

  return {
    success: true,
    message: 'success',
    data: categoryMapper.toDTO(categoryDB),
  };
};

module.exports = {
  ServiceSearchAllCategory,
  ServiceSearchCategoryById,
  ServiceInsertCategory,
  ServiceRemoveCategoryProducts,
  ServiceChangeCategory,
};
