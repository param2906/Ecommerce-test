const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    sequelize
      .authenticate()
      .then(() => {
        console.log("Database connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
    app.listen(PORT, () => {
      console.log("server is connected");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
