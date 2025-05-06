const express = require('express');
const axios = require('axios');
const router = express.Router();

// Handles POST request to /AI-recommendation/calculate
router.post('/calculate', async (req, res) => {
  // Build input payload for the Flask model
  const input = {
    Clothing: req.body.clothingType,
    Fabric: req.body.fabric_type,
    Stain: req.body.stain_type,
    Urgency: req.body.urgency,
    Condition: req.body.clothing_condition,
    SpecialCare: req.body.special_instructions || 'None' // Default to 'None' if not given
  };

  try {
    // Send prediction request to local Flask API
    const response = await axios({
      method: 'post',
      url: process.env.FLASK_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: input
    });

    const recommendation = response.data.recommendation;

    // Store both user input and prediction in session
    req.session.selections = {
      clothingType: req.body.clothingType,
      fabricType: req.body.fabric_type,
      stainType: req.body.stain_type,
      urgency: req.body.urgency,
      clothingCondition: req.body.clothing_condition,
      specialInstructions: req.body.special_instructions || 'None'
    };

    req.session.recommendation = recommendation;
    res.redirect('/AI-recommendation/results');
  } catch (err) {
    // Handle failure from Flask API
    console.error(' Error contacting Flask API:', err.message);

    if (err.response) {
      console.error(' Status Code:', err.response.status);
      console.error(' Response Headers:', err.response.headers);
      console.error(' Response Body:', err.response.data);
    }

    res.status(500).send('Error processing your request. Try again later.');
  }
});

// Show final recommendation result to user
router.get('/results', (req, res) => {
  const selections = req.session.selections || {};
  const recommendation = req.session.recommendation || "No recommendation available.";
  res.render('AI-recommendation-results', { recommendation, selections });
});

module.exports = router;
