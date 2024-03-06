const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');



router.post('/login',adminControllers.adminLogin);

module.exports= router