// routes/interviewRoutes.js
const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");
const Application = require("../models/Application");

// Get all interviews
router.get("/", async (req, res) => {
  try {
    const interviews = await Interview.find().sort({ date: 1 });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Schedule interview & update application status
router.post("/", async (req, res) => {
  const { applicationId, candidateName, job, date, time, interviewer, mode, link } = req.body;
  
  try {
    // 1. Create Interview
    const newInterview = new Interview({
      candidateName,
      job,
      applicationId,
      date,
      time,
      interviewer,
      mode,
      link
    });
    await newInterview.save();

    // 2. Update Application Status
    if (applicationId) {
      await Application.findByIdAndUpdate(applicationId, { status: "Interview Scheduled" });
    }

    res.status(201).json(newInterview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update interview status (Done/Cancelled)
router.patch("/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await Interview.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;