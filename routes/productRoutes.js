const express = require('express');
const router = express.Router();
const { updateProduct, deleteProduct } = require('../controllers/productsControllers');

// Update a product
router.put('/:id', updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

module.exports = router;



