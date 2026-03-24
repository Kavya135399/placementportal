// models/Application.js
const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  job: { type: String }, // Store job title for easy display
  university: { type: String },
  gpa: { type: String },
  appliedDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ["Under Review", "Shortlisted", "Interview Scheduled", "Selected", "Rejected"], 
    default: "Under Review" 
  },
  resume: { type: String }
});

module.exports = mongoose.model("Application", ApplicationSchema);