const Product = require("../models/product");
const { Op } = require("sequelize");
exports.createProduct = async (products) => {
  const product = await Product.create(products);

  return product;
};

exports.getProducts = async (searchQuery, category) => {
  const query = {};

  if (searchQuery) {
    query.name = { [Op.like]: `%${searchQuery}%` };
  }
  if (category && category !== "all") {
    query.categoryId = Number(category);
  }

  const products = await Product.findAll({ where: query });
  return products;
};

exports.getProductById = async (productId) => {
  const product = await Product.findByPk(productId);
  return product;
};

exports.updateProduct = async (product, body) => {
  const updatedProduct = await product.update(body);
  return updatedProduct;
};

exports.deleteProduct = async (product) => {
  await product.destroy();
};
