const express = require('express');
const router = express.Router();
const  productsControllers= require('../controllers/productsControllers');

// Update a product
router.put('/:id', productsControllers.updateProduct);

// Delete a product
router.delete('/:id', productsControllers.deleteProduct);

module.exports = router;



