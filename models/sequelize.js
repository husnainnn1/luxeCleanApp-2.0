const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    dialect: 'mysql',
    logging: false
  }
);

sequelize.authenticate()
  .then(() => console.log(' Connected to MySQL using Sequelize!'))
  .catch(err => console.error(' Unable to connect to MySQL:', err));

module.exports = sequelize;
