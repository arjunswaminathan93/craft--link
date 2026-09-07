const express = require("express");
const router = express.Router();
const supabase = require("../supabase");


/* =========================================
   GET ALL BUYER REQUIREMENTS
========================================= */

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("requirements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("GET REQUIREMENTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


/* =========================================
   CREATE BUYER REQUIREMENT
========================================= */

router.post("/", async (req, res) => {
  try {
    const {
      buyer_id,
      title,
      category,
      quantity,
      minimum_budget,
      maximum_budget,
      state,
      city,
      timeline,
      description,
    } = req.body;

    if (
      !title ||
      !category ||
      !quantity ||
      !minimum_budget ||
      !maximum_budget ||
      !state ||
      !city ||
      !timeline ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const { data, error } = await supabase
      .from("requirements")
      .insert([
        {
          buyer_id: buyer_id || null,
          title,
          category,
          quantity,
          minimum_budget,
          maximum_budget,
          state,
          city,
          timeline,
          description,
          status: "Active",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Requirement posted successfully",
      data,
    });

  } catch (error) {
    console.error("CREATE REQUIREMENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;