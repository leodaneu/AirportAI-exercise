const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');

// Get all Products
router.get('/products', auth.checkUserRole(['agent', 'passenger']), productController.getAllProducts);

// Search for Products
router.get('/products/search', auth.checkUserRole(['agent', 'passenger']), productController.searchProducts);

// Search for Products
router.get('/products/search/date', auth.checkUserRole(['agent', 'passenger']), productController.searchProductsByDate);

// Get Product by id
router.get('/products/:productId', auth.checkUserRole(['agent']), productController.getProductById);

// Create new Product
router.post('/products', auth.checkUserRole(['agent']), productController.createProduct);

// Delete Product
router.delete('products/:productId', auth.checkUserRole(['agent']), productController.deleteProduct);

module.exports = router;