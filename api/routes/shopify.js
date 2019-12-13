const express = require('express');
const router = express.Router();
const shiopifyController = require("../controllers/shopify")
const checkAuth = require('../middleware/check-auth');

router.get('/install', shiopifyController.getRedirectUrl)

router.get('/callback', shiopifyController.getShopifyAccessToken)


module.exports = router