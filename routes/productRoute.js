
const productModel = require('../models/product.model');
const express = require('express')
const router = express.Router()
const productsControllers = require('../controllers/productsControllers')
const  {authenticateAdmin} = require('../source/config/adminPassport');


// Update a product
router.put('/:id', authenticateAdmin,productsControllers.updateProduct);
// Delete a product
router.delete('/:id',authenticateAdmin ,productsControllers.deleteProduct);

router.post('/', authenticateAdmin,productsControllers.createProduct);

//these routes dont require admin authorization
router.get('/',productsControllers.getAllProducts);
router.get('/search',productsControllers.searchForProduts);
// router.get('/sortbyPrice')



 
module.exports = router;
