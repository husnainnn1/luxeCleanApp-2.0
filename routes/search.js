const express = require('express');
const { query, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const router = express.Router();
const { Op } = require('sequelize');
const Service = require('../models/Service');

// Handles GET /search?q=... request
router.get(
  '/',
  // Basic input validation — minimum of 2 characters
  query('q').trim().escape().isLength({ min: 2 }).withMessage('Invalid search input'),
  async (req, res) => {
    const errors = validationResult(req);
    const rawQuery = req.query.q || '';
    const q = sanitizeHtml(rawQuery); // Clean up anything malicious just in case

    // Make sure only logged-in users can search
    if (!req.session.user) {
      return res.redirect('/login');
    }

    // If input is invalid, reload page with errors
    if (!errors.isEmpty()) {
      return res.render('search', { query: q, results: [], errors: errors.array() });
    }

    try {
      // Look for matches across multiple fields using Sequelize's OR operator
      const results = await Service.findAll({
        where: {
          [Op.or]: [
            { item: { [Op.like]: `%${q}%` } },
            { description: { [Op.like]: `%${q}%` } },
            { category: { [Op.like]: `%${q}%` } }
          ]
        }
      });

      console.log('🔍 Results:', results.map(r => r.dataValues));
      res.render('search', { query: q, results, errors: [] });
    } catch (err) {
      console.error('Search error:', err);
      res.status(500).send('Internal server error');
    }
  }
);

module.exports = router;
