

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
             res.status(404).json({ message: 'Product not found' });
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
        const queryParameter = req.query.searchFor.trim();
        // console.log('query',queryParameter);
        const product = await Product.find({
            $or: [
                {model:{ $regex: queryParameter, $options: 'i' } },
                {brand:{ $regex: queryParameter, $options: 'i' } },
                {gender:{ $regex: queryParameter, $options: 'i' } },
                {description:{ $regex:queryParameter, $options: 'i' } }

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
            price: req.body.price,
            quantity:req.body.quantity
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
    const {sort} = req.query
    try {
        const products = await Product.find();
        if(!products){
            res.status(404).json({msg:' no products found'})
        }else{
            if(!sort){
                res.status(200).json(products);
            }else{
                let sortOption = parseInt(sort);
                const sortedProducts =await Product.find().sort({price:sortOption});
                res.status(200).json(sortedProducts);

            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
   
}
const searchProductsByPrice = async (req,res)=>{
    const {min,max}=req.query;
    try {
        const product = await Product.find(
            {price: {$gte:min,$lte:max}}
        ).sort({price:1})
        if(!product){
              res.status(404).json({msg:'ne product found'})
          }else{
            res.status(201).json(product);
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
  getAllProducts,
  searchProductsByPrice
};



