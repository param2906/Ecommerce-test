const sequelize = require("../config/db");
const Category = require("../models/category");
const Product = require("../models/product");

(async () => {
  try {
    await sequelize.sync({ force: true });

    const electronics = await Category.create({ name: "Electronics" });
    const clothing = await Category.create({ name: "Clothing" });

    await Product.create({
      name: "Smartphone",
      price: 699.99,
      categoryId: electronics.id,
    });
    await Product.create({
      name: "Laptop",
      price: 1299.99,
      categoryId: electronics.id,
    });
    await Product.create({
      name: "T-Shirt",
      price: 19.99,
      categoryId: clothing.id,
    });

    console.log("Database seeded!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database: ", error);
  }
})();
