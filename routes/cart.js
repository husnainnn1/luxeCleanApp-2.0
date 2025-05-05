const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// GET /cart — show cart contents
router.get('/', (req, res) => {
  const cart = req.session.cart || [];

  // Calculate the running total from prices in the cart
  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('£', '')) || 0;
    return sum + price;
  }, 0);

  res.render('cart', { cart, total: total.toFixed(2) });
});

// POST /cart/add — Add item to cart with validation and sanitization
router.post(
  '/add',
  [
    body('item').trim().escape().notEmpty(),
    body('description').trim().escape().notEmpty(),
    body('price').customSanitizer(val => val.replace(/[^\d.]/g, '')).isFloat({ gt: 0 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(' Invalid item attempt:', errors.array());
      return res.status(400).send('Invalid item data');
    }

    const { item, description, price } = req.body;

    if (!req.session.cart) req.session.cart = [];

    // Save item to session cart with price formatting
    req.session.cart.push({ item, description, price: `£${parseFloat(price).toFixed(2)}` });

    res.redirect('/cart');
  }
);

// POST /cart/clear — wipe all items from cart
router.post('/clear', (req, res) => {
  req.session.cart = [];
  res.redirect('/cart');
});

// POST /cart/remove — remove item by index
router.post(
  '/remove',
  body('index').isInt({ min: 0 }).toInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.redirect('/cart');

    const index = req.body.index;

    // Only remove if the index is valid
    if (req.session.cart && req.session.cart.length > index) {
      req.session.cart.splice(index, 1);
    }

    res.redirect('/cart');
  }
);

module.exports = router;
