const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

// Importing the middleware function (JWT passport)
const { authenticateUser } = require('../source/config/userPassport');

// registration and login to be added by youssef
router.post('/register',userController.registerUser)

router.post('/login', userController.loginUser)
// Get user profile
router.get('/profile',authenticateUser, userController.getUserProfile);

// the route that will receive the reset password request.
router.post('/forgotpassword', userController.forgotpassword)
//after receiving the token the user will be send it back in params along with the new  password and it confirmation
router.post('/resetpassword/:token',userController.resetPassword)
// Update user profile
router.put('/profile/:id',authenticateUser,  userController.updateUserProfile);

// Delete user profile
router.delete('/profile/:id',authenticateUser,  userController.deleteUserProfile);

module.exports = router;

