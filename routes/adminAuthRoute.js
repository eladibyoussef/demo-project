const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');



router.post('/login',adminControllers.adminLogin);
router.get('/logout',adminControllers.logOutAdmin);


module.exports= router