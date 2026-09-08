const express = require("express");
const cors = require("cors");
require("dotenv").config();

const supabase = require("./supabase");

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const profileRoutes = require("./routes/profiles");
const requirementRoutes = require("./routes/requirements");

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({
  limit: "10mb",
  extended: true
}));


/* =========================================
   API ROUTES
========================================= */

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/profiles", profileRoutes);

app.use("/api/requirements", requirementRoutes);


/* =========================================
   BACKEND CHECK
========================================= */

app.get("/", (req, res) => {
  res.json({
    message: "CraftLink AI Backend is running",
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Backend running on https://craft-link-s9ua.onrender.com/:${PORT}`
  );
});