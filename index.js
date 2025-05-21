require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { body, validationResult } = require('express-validator');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Service = require('./models/Service');
const bcrypt = require('bcryptjs');


const app = express();
const port = 8000;

// Basic security headers with CSP configured for Stripe
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
      frameSrc: ["'self'", "https://js.stripe.com"],
      formAction: ["'self'", "http://localhost:8000", "https://checkout.stripe.com"],
      connectSrc: ["'self'", "https://api.stripe.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"]
    }
  }
}));

// Throttle excessive requests
app.use(rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 700, // max requests per IP
  message: 'Too many requests from this IP, please try again later.'
}));

// Static files and parsers
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sessions (basic, no persistent store for now)
app.use(session({
  secret: 'SecretKey', // should use env var in production
  resave: false,
  saveUninitialized: true
}));

// Ensure cart is always available in session
app.use((req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  next();
});

// Templating
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Route handlers
app.use('/cart', require('./routes/cart'));
app.use('/checkout', require('./routes/checkout'));
app.use('/authentication', require('./routes/authentication'));
app.use('/AI-recommendation', require('./routes/AI-recommendation'));
app.use('/stripe', require('./routes/stripe'));
app.use('/contact', require('./routes/contact'));
app.use('/search', require('./routes/search'));

// Page routes
app.get('/', (req, res) => res.render('index', { user: req.session.user }));
app.get('/register', (req, res) => res.render('register', { errors: [] }));
app.get('/login', (req, res) => res.render('login'));
app.get('/price-list', (req, res) => res.render('price-list'));
app.get('/AI-recommendation', (req, res) => res.render('AI-recommendation'));
app.get('/success', (req, res) => {
  req.session.cart = []; // Clear cart on successful checkout
  res.render('success');
});
app.get('/privacy', (req, res) => res.render('privacy', { user: req.session.user }));

// Start server
//app.listen(port, () => {
//  console.log(`LuxeClean running at http://localhost:${port}`);
//});
const PORT = process.env.PORT || 8000; // 8000 for local dev fallback

app.listen(PORT, () => {
  console.log(`LuxeClean running on port ${PORT}`);
});

