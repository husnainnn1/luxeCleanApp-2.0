const express = require('express');
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const router = express.Router();

// Show contact form
router.get('/', (req, res) => {
  res.render('contact', { success: false, errors: [], user: req.session.user });
});

// Handle contact form POST — includes sanitization and validation
router.post(
  '/',
  [
    body('name').trim().escape().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('subject').trim().escape().notEmpty().withMessage('Subject is required'),
    body('message').customSanitizer(msg => sanitizeHtml(msg)).notEmpty().withMessage('Message is required')
  ],
  (req, res) => {
    const errors = validationResult(req);
    
    // If something’s invalid, just re-render the form with feedback
    if (!errors.isEmpty()) {
      return res.render('contact', { success: false, errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // Log it — I can later hook this up to email or DB
    console.log(" Message received:", { name, email, subject, message });

    // Show success message
    res.render('contact', { success: true, errors: [], user: req.session.user });
  }
);

module.exports = router;
