const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');


router.post('/', async (req, res) => {
  try {
    const {
      email,
      overallRating,
      eventRatings = {},
      mentoringQuality,
      organizerSupport,
      venueQuality,
      judgingFairness,
      quickFeedback,
      continueSupport,
      contactPermission
    } = req.body;

    // Simple validation
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide a valid email' 
      });
    }

    const feedback = new Feedback({
      email,
      overallRating,
      eventRatings,
      mentoringQuality,
      organizerSupport,
      venueQuality,
      judgingFairness,
      quickFeedback,
      continueSupport,
      contactPermission
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback!'
    });

  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});



// Helper function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

module.exports = router;