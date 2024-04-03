const express = require('express')
const router = express.Router()
const adminControllers= require('../controllers/adminControllers')
const  {authenticateAdmin} = require('../source/config/adminPassport');

// Route to get all users, accessible only by authenticated admins
router.get('/', adminControllers.getAllUsers);

router.put('/:id',adminControllers.UpdatUserById );

router.delete('/:id',adminControllers.DelelUserById);

module.exports = router
