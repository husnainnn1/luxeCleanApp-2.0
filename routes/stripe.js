// routes/stripe.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// POST /stripe/checkout — handles checkout session creation
router.post('/checkout', async (req, res) => {
  try {
    const cart = req.session.cart || [];
    const deliveryDate = req.session.deliveryDate || 'Not specified';
    const surcharge = req.session.surcharge || 0;
    const finalTotal = req.session.finalTotal || 0;

    // Doesn't let user proceed if nothing in the cart
    if (!cart.length) {
      console.warn(" Attempted checkout with empty cart.");
      return res.status(400).send("Cart is empty.");
    }

    // Formats each item for Stripe
    const line_items = cart.map(item => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.item,
          description: item.description || ''
        },
        unit_amount: Math.round(parseFloat(item.price.replace('£', '')) * 100)
      },
      quantity: 1
    }));

    // Adds a delivery charge if needed
    if (surcharge > 0) {
      line_items.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Delivery Surcharge',
            description: `${surcharge === 10 ? 'Same-day' : 'Next-day'} delivery`
          },
          unit_amount: surcharge * 100
        },
        quantity: 1
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${process.env.BASE_URL}/success/`,
      cancel_url: `${process.env.BASE_URL}/cart/`,
      metadata: {
        deliveryDate,
        deliverySurcharge: `£${surcharge}`,
        fullTotal: `£${finalTotal}`
      }
    });

    // Sends user to Stripe payment page
    return res.redirect(303, session.url);

  } catch (err) {
    console.error('Stripe Checkout Error:', err.message);
    if (!res.headersSent) {
      return res.status(500).send('Payment processing error');
    }
  }
});

// Stripe webhook endpoint to handle payment events
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Invalid Stripe signature:', err.message);
    return res.sendStatus(400);
  }

  // Handle post-payment workflow
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const deliveryDate = session.metadata.deliveryDate;
    const surcharge = session.metadata.deliverySurcharge;
    const fullTotal = session.metadata.fullTotal;
    const email = session.customer_details?.email;

    console.log(' Payment complete');
    console.log(' Delivery Date:', deliveryDate);
    console.log(' Surcharge:', surcharge);
    console.log(' Total Paid:', fullTotal);

    // Email customer confirmation
    if (email) {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: 'LuxeClean <noreply@luxeclean.com>',
        to: email,
        subject: 'Your LuxeClean Order Confirmation',
        html: `
          <h2>Thanks for your order!</h2>
          <p><strong>Delivery Date:</strong> ${deliveryDate}</p>
          <p><strong>Surcharge:</strong> ${surcharge}</p>
          <p><strong>Total Paid:</strong> ${fullTotal}</p>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(' Confirmation email sent to', email);
      } catch (e) {
        console.error(' Email failed:', e.message);
      }
    }
  }

  res.status(200).json({ received: true });
});

module.exports = router;
