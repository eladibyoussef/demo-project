const productModel = require('../models/product.model');
const express = require('express')
const router = express.Router()
const productsControllers = require('../controllers/productsControllers')
const adminControllers= require('../controllers/adminControllers')
const  {authenticateAdmin} = require('../source/config/adminPassport');


router.post('/', authenticateAdmin,productsControllers.createProduct);

module.exports = router;
