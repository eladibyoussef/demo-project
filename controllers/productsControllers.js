const Product = require('../models/product.model')
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

    module.exports= {
        searchForProduts
    }