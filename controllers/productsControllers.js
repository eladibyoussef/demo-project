

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
        console.log(updatedProduct);

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

//to try to minimise the code lines and orevent using ifelse statement a lot , 
//I used the $or query operator to implament the a felxible search 
const searchForProduts = async (req,res)=>{
    try {
        const queryParameter = req.query.searchFor
        // console.log('query',queryParameter);
        const product = await Product.find({
            $or: [
                {model:queryParameter },
                {brand:queryParameter },
                {gender:queryParameter }
            ]
        });
        if(!product){
            res.status(404).json({msg:'sorry we don\'t have a product that matches the criteria' })
        }else{
            res.status(200).json({product});
        }
        
    } catch (error) {
        console.log('catched error :',error.message);
        res.status(500).json({error: error.message})
    }
    }


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

const getAllProducts = async (req,res)=>{
    try {
        const products = await Product.find();
        if(!products){
            res.status(404).json({msg:' no products found'})
        }else{
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
   
}

module.exports = {
    updateProduct,
    deleteProduct,
  searchForProduts,
  createProduct,
  getAllProducts
};



