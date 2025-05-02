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
    max: 3
  },
  eventRatings: {
    preHackWorkshop: { type: Number, min: 0, max: 3 },
    ideationRound: { type: Number, min: 0, max: 3 },
    hackathon: { type: Number, min: 0, max: 3 },
    finalPitch: { type: Number, min: 0, max: 3 }
  },
  mentoringQuality: { type: Number, min: 0, max: 3 },
  organizerSupport: { type: Number, min: 0, max: 3 },
  venueQuality: { type: Number, min: 0, max: 3 },
  judgingFairness: { type: Number, min: 0, max: 3 },
  quickFeedback: String,
  continueSupport: Boolean,
  contactPermission: Boolean,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);