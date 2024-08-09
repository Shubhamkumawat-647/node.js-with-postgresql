// index.js
const express = require('express');
const { connectDB } = require('./config/database');
const { initModels } = require('./model/');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const startServer = async () => {
  // Connect to the database
  await connectDB();

  // Initialize all models
  await initModels();

  // Use user routes
  app.use('/users', userRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
