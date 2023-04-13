const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const user = require('../models/user');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', userController.login);

// Only agent type users can access the CRUD methods for users
// Register User
router.post('/register', userController.register);

// Get all Users
router.get('/users', userController.getAllUsers);

// Get User by id
router.get('/users/:userId', userController.getUserById);

// Delete User
router.delete('users/:id', auth.isAgent, userController.deleteUser);

module.exports = router;