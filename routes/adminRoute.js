const express = require('express')
const router = express.Router()
const adminControllers= require('../controllers/adminControllers')
const  {authenticateAdmin} = require('../source/config/adminPassport');

// Route to get all users, accessible only by authenticated admins
router.get('/', authenticateAdmin, adminControllers.getAllUsers);

router.get('/',authenticateAdmin,adminControllers.getAllUsers );

router.put('/:id',authenticateAdmin,adminControllers.UpdatUserById );

router.delete('/:id',authenticateAdmin,adminControllers.DelelUserById);

module.exports = router
