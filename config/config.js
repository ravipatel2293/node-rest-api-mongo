const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  JWT_KEY: process.env.JWT_KEY,
  SHOPIFY_API_KEY:process.env.SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET:process.env.SHOPIFY_API_SECRET
};