const Category = require("../models/category");

exports.createCategory = async (categories) => {
  const category = await Category.create(categories);
  return category;
};

exports.getProducts = async () => {
  const category = await Category.findAll();
  return category;
};
