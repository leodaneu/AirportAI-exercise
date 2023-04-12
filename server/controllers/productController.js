const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server error'})
    }
};

const createProduct = async(req, res) => {
    const newProduct = new Product(req.body);
    
    newProduct.save()
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((error) => {
            res.status(500).json({error: error.message});
        });
};

const getProductById = async(req, res) => {
    const productId = req.params.productId;
    
    try {
        const product = await Product.findOne({productId: productId});

        if (!product) {
            return res.status(404).json({error: 'Product not found'});
        }
        res.json(product);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
};

const deleteProduct = async(req, res) => {
    const productId = req.params.productId;

    try {
        //const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        const deletedProduct = await Product.findOneAndDelete({productId: productId})

        if (!deletedProduct) {
            return res.status(404).json({error: 'Product not found'});
        }

        res.json({mesage: 'Product deleted succesfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
};

const searchProducts = async(req, res) => {
    const {searchTerm} = req.query;

    try {
        const products = await Product.find({
            $or: [
                {description: {$regex: searchTerm, $options: 'i'}},                
                {brand: {$regex: searchTerm, $options: 'i'}},
                {color: {$regex: searchTerm, $options: 'i'}}
            ]
        });
        res.json({products});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "An error occured during search."})
    }
}

// Search Products by date range
const searchProductsByDate = async(req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        const products = await Product.find({    
            lostTime: {$gte: startDate, $lte: endDate}            
        });
        res.json({products});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "An error occured during search."})
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    searchProducts,
    searchProductsByDate
}