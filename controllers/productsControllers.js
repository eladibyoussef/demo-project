const Product = require('../models/product.model');

const createProduct = async (req, res) => {
    try {
        const existingProduct = await Product.findOne({ model: req.body.model });

        if (existingProduct) {
            return res.status(409).json({ message: "Product already exists" });
        }
        const product = new Product({
            model: req.body.model,
            brand: req.body.brand,
            description: req.body.description,
            gender: req.body.gender,
            price: req.body.price
        });

        const newProduct = await product.save();
        
        if (newProduct) {
            res.status(201).json({ message: "Product created" });
        } else {
            res.status(500).json({ message: "Failed to create product" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createProduct
};
