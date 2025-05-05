const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

// Defining the 'Service' model to map to the 'services' table
const Service = sequelize.define('Service', {
  item: {
    type: DataTypes.STRING,
    allowNull: false // item name must be provided
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false // expecting numeric prices
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false // helps group services for search/filter
  }
}, {
  tableName: 'services',
  timestamps: false // not using Sequelize's default createdAt/updatedAt
});

// Exporting model to use it in queries elsewhere
module.exports = Service;
