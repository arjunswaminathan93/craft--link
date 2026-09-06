const express = require("express");
const router = express.Router();
const supabase = require("../supabase");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
// GET all products
// GET all products
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("id,name,category,price,quantity,image_url")
      .limit(50);

    if (error) throw error;

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// ADD new product
router.post("/", async (req, res) => {
  console.log("POST REQUEST RECEIVED");

  try {
    const {
      name,
      category,
      price,
      quantity,
      image_url,
    } = req.body;

    if (!name || !category || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Name, category, price and quantity are required",
      });
    }

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          category,
          price,
          quantity,
          image_url,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data,
    });

  } catch (error) {
    console.error("POST PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      category,
      price,
      quantity,
      image_url,
    } = req.body;

    const { data, error } = await supabase
      .from("products")
      .update({
        name,
        category,
        price,
        quantity,
        image_url,
      })
      .eq("id", id)
      .select();

    if (error) throw error;

    res.json({
      success: true,
      message: "Product updated successfully",
      data,
    });

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// UPLOAD PRODUCT IMAGE
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const fileName = `products/${Date.now()}-${req.file.originalname}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    res.json({
      success: true,
      image_url: data.publicUrl,
    });

  } catch (error) {
    console.error("IMAGE UPLOAD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;