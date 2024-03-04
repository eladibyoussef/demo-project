const express = require('express')
const router = express.Router()
const adminControllers= require('../controllers/adminControllers')
const  {authenticateAdmin} = require('../source/config/adminPassport');

// Route to get all users, accessible only by authenticated admins
router.get('/users', authenticateAdmin, adminControllers.getAllUsers);

router.get('/users',authenticateAdmin,adminControllers.getAllUsers );

router.put('/users/:id',authenticateAdmin,adminControllers.UpdatUserById );

router.delete('/users/:id',authenticateAdmin,adminControllers.DelelUserById);

module.exports = router
