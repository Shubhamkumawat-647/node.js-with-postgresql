// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  schema: process.env.DB_SCHEMA, // Add schema support
});

const initUserTable = async () => {
  try {
    await User.sync({ alter: true });  
  } catch (error) {
    console.error('Error creating User table:', error);
  }
};

module.exports = { User, initUserTable };
