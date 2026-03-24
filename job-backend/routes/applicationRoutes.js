// routes/applicationRoutes.js
const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// Get all applications (with optional status filter)
router.get("/", async (req, res) => {
  const { status } = req.query;
  const filter = status && status !== "All" ? { status } : {};
  
  try {
    const apps = await Application.find(filter).sort({ appliedDate: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create application (optional, if applying from frontend)
router.post("/", async (req, res) => {
  try {
    const newApp = new Application(req.body);
    await newApp.save();
    res.status(201).json(newApp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update application status
router.patch("/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const updatedApp = await Application.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(updatedApp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;