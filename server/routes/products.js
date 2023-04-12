const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');

// Get all Products
router.get('/products', productController.getAllProducts);

// Search for Products
router.get('/products/search', productController.searchProducts);

// Get Product by id
router.get('/products/:productId', productController.getProductById);

// Create new Product
router.post('/products', productController.createProduct);

// Delete Product
router.delete('products/:productId', auth.isAgent, productController.deleteProduct);

module.exports = router;