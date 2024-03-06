
const productModel = require('../models/product.model');
const express = require('express')
const router = express.Router()
const productsControllers = require('../controllers/productsControllers')
const  {authenticateAdmin} = require('../source/config/adminPassport');


// Update a product
router.put('/:id', productsControllers.updateProduct);
// Delete a product
router.delete('/:id', productsControllers.deleteProduct);

router.get('/search',productsControllers.searchForProduts);

router.post('/', authenticateAdmin,productsControllers.createProduct);
router.get('/',productsControllers.getAllProducts);



 
module.exports = router;
