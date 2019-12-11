const express = require('express');
const router = express.Router();
const productController = require("../controllers/products")
const checkAuth = require('../middleware/check-auth');

router.get('/', productController.getAllProduct)

router.post('/', productController.createProduct)

router.get('/:productId',checkAuth, productController.getProduct)

router.put('/:productId', productController.updateProduct)

router.delete('/:productId',productController.deleteProduct)

module.exports = router