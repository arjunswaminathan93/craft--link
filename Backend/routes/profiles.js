const express = require("express");
const router = express.Router();
const supabase = require("../supabase");


/* =========================================
   CREATE PROFILE
========================================= */

router.post("/", async (req, res) => {
  try {
    const {
      name,
      role,
      email,
      phone,
      state,
      city,
    } = req.body;

    if (!name || !role || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, role and email are required",
      });
    }

    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          name,
          role,
          email,
          phone: phone || null,
          state: state || null,
          city: city || null,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data,
    });

  } catch (error) {
    console.error("CREATE PROFILE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


/* =========================================
   GET PROFILE BY EMAIL AND ROLE
   Used for BOTH Buyer and Artisan Login
========================================= */

router.get("/", async (req, res) => {
  try {
    const { email, role } = req.query;

    if (!email || !role) {
      return res.status(400).json({
        success: false,
        message: "Email and role are required",
      });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .eq("role", role)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Profile not found. Please register first.",
      });
    }

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("GET PROFILE BY EMAIL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


/* =========================================
   GET PROFILE BY ID
========================================= */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;