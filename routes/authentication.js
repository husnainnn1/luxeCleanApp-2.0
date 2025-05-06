const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Quick sanitizer to scrub all HTML from user input
function cleanInput(input) {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {}
  });
}

// Middleware to protect routes from unauthenticated access
function ensureAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

// Handle user registration
// Handle user registration
router.post('/register',
  [
    body('firstname').trim().isAlpha().withMessage('Only letters allowed')
      .isLength({ min: 2 }).withMessage('Too short').escape(),

    body('lastname').trim().isAlpha().withMessage('Only letters allowed')
      .isLength({ min: 2 }).withMessage('Too short').escape(),

    body('username').trim().isLength({ min: 4 }).withMessage('Username too short')
      .matches(/^[a-zA-Z0-9_]+$/).withMessage('Invalid username chars').escape(),

    body('password').custom(value => {
      const errors = [];
      if (value.length < 6) {
        errors.push('Password must be at least 6 characters long');
      }
      if (!/[0-9]/.test(value)) {
        errors.push('Password must include at least one number');
      }
      if (!/[a-z]/.test(value)) {
        errors.push('Password must include at least one lowercase letter');
      }
      if (errors.length) {
        throw new Error(errors.join('. '));
      }
      return true;
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render('register', { errors: errors.array() });
    }

    const { firstname, lastname, username, password } = req.body;

    try {
      const hashed = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstname: cleanInput(firstname),
        lastname: cleanInput(lastname),
        username: cleanInput(username),
        password: hashed
      });

      console.log(` Registered user: ${newUser.username}`);
      return res.render('login');
    } catch (err) {
      console.error(" Registration Error:", err.message);
      return res.status(500).render('register', {
        errors: [{ msg: 'An error occurred. Try again later.' }]
      });
    }
  }
);

// Handle login logic
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).render('login', { error: 'Missing fields' });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).render('login', { error: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).render('login', { error: 'Wrong password' });
    }

    // Store session data
    req.session.user = {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname
    };

    res.redirect('/');
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).render('login', { error: 'Server error. Try again.' });
  }
});

// Handle logout and destroy session
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("❌ Logout error:", err);
      return res.status(500).send('Logout failed');
    }
    res.redirect('/login');
  });
});

module.exports = router;
module.exports.ensureAuthenticated = ensureAuthenticated;
