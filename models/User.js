const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // connects to our DB config

// User model definition for Sequelize ORM
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING(50),
    allowNull: false, // must be filled
    unique: true      // no duplicates allowed
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false  // hashed passwords expected here
  },
  firstname: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'users', // just to be safe and explicit
  timestamps: false   // not using createdAt/updatedAt here
});

// Export the model to use it in routes, auth etc
module.exports = User;
