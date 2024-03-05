const Product = require('../models/product.model');

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { model, brand, description, gender, price } = req.body;

        // Find the product by ID and update its fields
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            model: model,
            brand: brand,
            description: description,
            gender: gender,
            price: price
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    updateProduct,
    deleteProduct
};
