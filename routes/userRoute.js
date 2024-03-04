const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

// Importing the middleware function (JWT passport)
const { authenticateUser } = require('../source/config/userPassport');

// registration and login to be added by youssef

// Get user profile
router.get('/profile', userController.getUserProfile);

// Update user profile
router.put('/profile/:id',  userController.updateUserProfile);

// Delete user profile
router.delete('/profile/:id',  userController.deleteUserProfile);

module.exports = router;

