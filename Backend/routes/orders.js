const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// GET all orders with product details
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        products (
          id,
          name,
          price,
          image_url,
          category
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

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
// CREATE new order
router.post("/", async (req, res) => {
  try {
    const {
      product_id,
      quantity,
      total_amount,
    } = req.body;

    if (
      !product_id ||
      !quantity ||
      !total_amount
    ) {
      return res.status(400).json({
        success: false,
        message: "Product, quantity and total amount are required",
      });
    }

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          product_id,
          quantity,
          total_amount,
          status: "Pending",
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
    console.error("CREATE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// UPDATE order status
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) throw error;

    res.json({
      success: true,
      message: "Order status updated",
      data,
    });

  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;