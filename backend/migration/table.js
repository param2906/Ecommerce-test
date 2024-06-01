const sequelize = require("../config/db");
const Category = require("../models/category");
const Product = require("../models/product");

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database & tables created!");
    process.exit();
  } catch (error) {
    console.error("Error creating database: ", error);
  }
})();
