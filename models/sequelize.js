const { Sequelize } = require('sequelize');
require('dotenv').config();

// Set up Sequelize instance using credentials from .env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql' // using MySQL for this project
  }
);

// Test DB connection to make sure it's working
sequelize.authenticate()
  .then(() => console.log('Connected to MySQL using Sequelize!'))
  .catch(err => console.error('Unable to connect to MySQL:', err));

// Exporting so I can use this Sequelize instance in models
module.exports = sequelize;
