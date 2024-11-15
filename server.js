const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

const productRoute = require("./src/routes/productRoute");
const saleRoute = require("./src/routes/saleRoute");

app.use(cors());
app.use(express.json());

app.use("/api/sale", saleRoute);
app.use("/api/product", productRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed, error:", error);
  }
});

module.exports = app;
