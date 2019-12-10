const mongoose = require("mongoose");
const Product = require("../models/product")
const logger = require("../utils/logger")
const response = require("../utils/response")


exports.getAllProduct = (req, res, next) => {
  Product.find()
    .select('_id name price')
    .exec()
    .then((docs) => {
      logger.info("All products fetched successfully", "Product controller: getAllProduct")
      return response.json(res, {
        count: docs.length,
        products: docs
      })
    })
    .catch((err) => {
      logger.error(`Error occurred: ${err}`, "Database Product controller: getAllProduct")
      return response.json(res, null, response.SERVER_ERROR, err.message)
    })
}

exports.createProduct = (req, res, next) => {

  //Create new product schema
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  // Save the product and return the response
  product.save().then((result) => {
      logger.info("New Product is created successfully", "Product controller:createProduct")
      return response.json(res, result)
    })
    .catch((err) => {
      logger.error(`Error occurred: ${err}`, "Product controller: createProduct");
      return response.json(res, null, response.SERVER_ERROR, err.message);
    })
}

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId
  // if given id not matched valid regex then return bad request
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    logger.info(`Productid is not valid --> ${productId}`);
    return response.json(res, null, response.BAD_REQUEST, "Given product id is not valid.");
  }
  Product.findById(productId)
    .select('_id name price')
    .exec()
    .then((doc) => {
      if (doc) {
        logger.info("Product by id fetched successfully", "Product controller: getProduct");
        return response.json(res, doc);
      } else {
        logger.error(`Product not found for: ${productId}`, "Product controller: getProduct");
        return response.json(res, null, response.NOT_FOUND);
      }

    })
    .catch((err) => {
      logger.error(`Error occurred: ${err}`, "Product controller: getProduct");
      return response.json(res, null, response.SERVER_ERROR, err.message);
    })
}

exports.updateProduct = (req, res, next) => {
  const id = req.params.productId;
  // if given id not matched valid regex then return bad request
  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.info(`Productid is not valid --> ${id}`, "Product controller: updateProduct");
    return response.json(res, null, response.BAD_REQUEST, "Given product id is not valid.");
  }
  const updateOps = {};
  for (const key in req.body) {
    updateOps[key] = req.body[key];
  }
  Product.findOneAndUpdate({
    _id: id
  }, updateOps, {
    new: true
  }).exec().then((result) => {
    logger.info("Product details is updated successfully", "Product controller: updateProduct");
    return response.json(res, result);
  }).catch(() => {
    logger.error(`Error occurred: ${err}`, "Product controller: updateProduct");
    return response.json(res, null, response.SERVER_ERROR, err.message);
  })
}

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;
  // if given id not matched valid regex then return bad request
  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.info(`Productid is not valid --> ${id}`, "Product controller: deleteProduct");
    return response.json(res, null, response.BAD_REQUEST, "Given product id is not valid.");
  }
  Product.remove({
      _id: id
    })
    .exec()
    .then(result => {
      return response.json(res, null)
    })
    .catch(err => {
      logger.error(`Error occurred: ${err}`, "Product controller: deleteProduct");
      return response.json(res, null, response.SERVER_ERROR, err.message);
    });
}