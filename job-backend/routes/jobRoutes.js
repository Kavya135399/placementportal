// routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ posted: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new job
router.post("/", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Toggle Job Status (Open/Closed)
router.patch("/:id/toggle", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    
    job.status = job.status === "Open" ? "Closed" : "Open";
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;