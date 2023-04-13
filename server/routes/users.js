const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Login
router.post('/login', userController.userLogin);

// Register User
router.post('/register', userController.register);

// Get all Users
router.get('/users', auth.checkUserRole(['agent']), userController.getAllUsers);

// Get User by id
router.get('/users/:userId', auth.checkUserRole(['agent']), userController.getUserById);

// Delete User
router.delete('users/:id', auth.checkUserRole(['agent']), userController.deleteUser);

module.exports = router;