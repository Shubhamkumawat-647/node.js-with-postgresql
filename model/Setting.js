// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Setting = sequelize.define('Setting', {
    isNotificationEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  iaIsNewDashboardEnabledstName: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Timezone: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  schema: process.env.DB_SCHEMA, // Add schema support
});

const initSettingTable = async () => {
  try {
    await Setting.sync({ alter: true });  
  } catch (error) {
    console.error('Error creating User table:', error);
  }
};

module.exports = { Setting, initSettingTable };
