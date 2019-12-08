const express = require('express');
const Product = require("../models/product");
const mongoose = require('mongoose');
const router = express.Router();
const productController = require("../controllers/products")

router.get('/', productController.getAllProduct)

router.post('/', productController.createProduct)

router.get('/:productId', productController.getProduct)

router.put('/:productId', productController.updateProduct)

router.delete('/:productId',productController.deleteProduct)

module.exports = router