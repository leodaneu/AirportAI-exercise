const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Only agent type users can access the CRUD methods for users
// Get all Users
router.get('/users', userController.getAllUsers);

// Get User by id
router.get('/users/:userId', userController.getUserById);

// Create new User
router.post('/users', userController.createUser);

// Delete User
router.delete('users/:id', auth.isAgent, userController.deleteUser);

module.exports = router;