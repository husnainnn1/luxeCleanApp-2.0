const express = require('express');
const router = express.Router();

// GET /checkout — display final cart with optional delivery date surcharge
router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  const deliveryDate = req.query.deliveryDate;

  // Calculate base total by stripping currency symbol
  let total = 0;
  cart.forEach(item => {
    total += parseFloat(item.price.replace('£', ''));
  });

  // Check if user selected same-day or next-day delivery
  const today = new Date();
  const selected = new Date(deliveryDate);

  const sameDay = selected.toDateString() === today.toDateString();
  const nextDay =
    selected.getDate() === today.getDate() + 1 &&
    selected.getMonth() === today.getMonth() &&
    selected.getFullYear() === today.getFullYear();

  // Apply surcharge based on urgency
  let surcharge = 0;
  if (sameDay) surcharge = 10;
  else if (nextDay) surcharge = 5;

  const finalTotal = total + surcharge;

  // Save totals and date in session for later use (e.g. Stripe)
  req.session.finalTotal = finalTotal;
  req.session.surcharge = surcharge;
  req.session.deliveryDate = deliveryDate;

  res.render('checkout', {
    cart,
    total: finalTotal.toFixed(2),
    surcharge,
    deliveryDate
  });
});

module.exports = router;
