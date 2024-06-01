const service = require("../service/productService");

exports.createProduct = async (req, res) => {
  try {
    const reqData = req.body;
    const product = await service.createProduct(reqData);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const products = await service.getProducts(search, category);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await service.getProductById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await service.getProductById(req.params.id);
    if (product) {
      const updatedProduct = await service.updateProduct(product, req.body);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json("product not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await service.getProductById(req.params.id);
    if (product) {
      await service.deleteProduct(product);
      res.status(200).json(product);
    } else {
      res.status(404).json("product not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
