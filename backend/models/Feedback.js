const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  overallRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  eventRatings: {
    preHackWorkshop: { type: Number, min: 0, max: 5 },
    ideationRound: { type: Number, min: 0, max: 5 },
    hackathon: { type: Number, min: 0, max: 5 },
    finalPitch: { type: Number, min: 0, max: 5 }
  },
  mentoringQuality: { type: Number, min: 0, max: 5 },
  organizerSupport: { type: Number, min: 0, max: 5 },
  venueQuality: { type: Number, min: 0, max: 5 },
  judgingFairness: { type: Number, min: 0, max: 5 },
  quickFeedback: String,
  continueSupport: Boolean,
  contactPermission: Boolean,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);