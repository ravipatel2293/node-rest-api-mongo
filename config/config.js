const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  JWT_KEY: process.env.JWT_KEY,
};