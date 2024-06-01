const service = require("../service/categoryService");

exports.createCategory = async (req, res) => {
  try {
    const product = await service.createCategory(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const products = await service.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
