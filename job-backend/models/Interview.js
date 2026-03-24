// models/Interview.js
const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  job: { type: String },
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
  date: { type: String }, // Stored as string to match frontend input type="date"
  time: { type: String },
  interviewer: { type: String },
  mode: { type: String, default: "Video Call" },
  link: { type: String },
  status: { type: String, default: "Scheduled" }
});

module.exports = mongoose.model("Interview", InterviewSchema);