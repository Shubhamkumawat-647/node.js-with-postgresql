// models/index.js
const { initUserTable } = require('./User');
const { initSettingTable } = require('./Setting');

const initModels = async () => {
  try {
    // Initialize each model (in this example, only User is included)
    await initUserTable();
    await initSettingTable();
    // If there were more models, you would call their init functions here
    console.log('All models initialized successfully.');
  } catch (error) {
    console.error('Error initializing models:', error);
  }
};

module.exports = { initModels };
