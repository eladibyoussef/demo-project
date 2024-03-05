const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsControllers')



router.get('/search',productController.searchForProduts)


module.exports = router;