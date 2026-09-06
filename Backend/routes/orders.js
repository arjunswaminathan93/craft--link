const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// GET all orders
router.get("/", async (req, res) => {
  console.log("🔥 GETTING ORDERS FROM SUPABASE 🔥");

  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    console.log("ORDERS DATA:", data);

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ADD new order
router.post("/", async (req, res) => {
  try {
    const {
      product_name,
      buyer_name,
      quantity,
      total_price,
      status,
    } = req.body;

    if (!product_name || !buyer_name || !quantity || !total_price) {
      return res.status(400).json({
        success: false,
        message: "All order details are required",
      });
    }

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          product_name,
          buyer_name,
          quantity,
          total_price,
          status: status || "Pending",
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data,
    });

  } catch (error) {
    console.error("POST ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;