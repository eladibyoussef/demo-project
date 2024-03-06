const Product = require('../models/product.model');

const createProduct = async (req, res) => {
    const product = new productModel({
        model: req.body.model,
        brand: req.body.brand,
        description: req.body.description,
        gender: req.body.gender,
        price: req.body.price,
    });

    try {
        const newProduct = await Product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createProduct
};