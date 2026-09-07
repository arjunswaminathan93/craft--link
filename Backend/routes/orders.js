const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

/* =========================================
   GET ALL ORDERS WITH PRODUCT DETAILS
========================================= */

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
          category,
          artisan_id
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


/* =========================================
   GET ORDERS FOR SPECIFIC ARTISAN
========================================= */

router.get("/artisan/:artisanId", async (req, res) => {
  try {
    const { artisanId } = req.params;

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        products (
          id,
          name,
          price,
          image_url,
          category,
          artisan_id
        )
      `)
      .eq("artisan_id", artisanId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("GET ARTISAN ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


/* =========================================
   CREATE NEW ORDER
========================================= */

router.post("/", async (req, res) => {
  try {
    const {
      product_id,
      buyer_id,
      artisan_id,
      quantity,
      total_amount,
    } = req.body;

    if (
      !product_id ||
      !artisan_id ||
      !quantity ||
      !total_amount
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Product, artisan, quantity and total amount are required",
      });
    }

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          product_id,
          buyer_id: buyer_id || null,
          artisan_id,
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


/* =========================================
   UPDATE ORDER STATUS
========================================= */

router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Order status is required",
      });
    }

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