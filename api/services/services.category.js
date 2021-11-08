const { category, product } = require("../models/models.index");
const categoryMapper = require("../mappers/mappers.category");
const fileUtils = require("../utils/file.util");
const ErrorRegraDeNegocio = require("../utils/errors/erro-regra-negocio");

const ServiceSearchAllCategory = async () => {
  const categoryDB = await category.find({}).sort({ description: 1 });
  if (categoryDB) {
    return {
      success: true,
      message: "Operation performed successfully",
      data: categoryDB,
    };
  } else {
    return {
      success: false,
      details: "No categories found",
    };
  }
};

const ServiceSearchCategoryById = async (categoryid) => {
  const categoryDB = await category.findById(categoryid);
  if (categoryDB) {
    return {
      success: true,
      message: "Operation performed successfully",
      data: categoryDB,
    };
  } else {
    return {
      success: false,
      details: "No categories found",
    };
  }
};

const ServiceInsertCategory = async (model) => {
  const novacategory = await category.create({
    name: model.name,
    description: model.description,
    image: {
      original_name: model.image.originalName,
      name: model.image.newName,
      type: model.image.type,
    },
  });

  fileUtils.move(model.image.oldPath, model.image.newPath);

  return {
    sucesso: true,
      message: "Operation performed successfully",
    data: categoryMapper.toDTO(novacategory),
  };
};

const ServiceRemoveCategoryProducts = async (categoryId) => {
  const categoryDB = await category.findOne({ _id: categoryId });

  if (!categoryDB) {
    new ErrorRegraDeNegocio("category não encontrada!");
  }

  const { image } = categoryDB;
  fileUtils.remove("category", image.name);

  await category.deleteOne(categoryDB);

  return {
    success: true,
    message: "Operation performed successfully!",
  };
};

const ServiceChangeCategory = async (categoryId, model) => {
  const categoryDB = await category.findOne({ _id: categoryId });

  if (!categoryDB) {
    return {
      success: false,
      message: "could not perform the operation",
      details: ["categoryid doesn't exist."],
    };
  }

  categoryDB.name = model.name;
  categoryDB.description = model.description;
  categoryDB.status = model.status;

  if (typeof model.image === "object") {
    fileUtils.remove("category", categoryDB.image.name);
    fileUtils.move(model.image.caminhoOriginal, model.image.newCaminho);
    categoryDB.image = {
      originalName: model.image.originalName,
      name: model.image.newame,
      type: model.image.type,
    };
  }

  await categoryDB.save();

  return {
    success: true,
    message: "success",
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
