// routes/userRoutes.js
const express = require('express');
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.get('/get', getAllUsers);         // Fetch all users
router.post('/create', createUser);      // Create a new user
router.get('/get/:id', getUserById);     // Fetch a user by ID
router.put('/update/:id', updateUser);   // Update a user by ID
router.delete('/delete/:id', deleteUser);

module.exports = router;
