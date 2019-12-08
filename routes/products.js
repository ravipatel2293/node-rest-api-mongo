const express = require('express');
const Product = require("../models/product");
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', (req, res, next) => {
  Product.find()
    .select('_id name price')
    .exec()
    .then((docs)=>{
      const response = {
        count:docs.length,
        products:docs
      }
      res.status(200).send({
        success:true,
        status:200,
        message: "product GET api is called",
        payload:response
      })
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).send({
        error:err
      })
    })
})

router.post('/', (req, res, next) => {
  
  //Create new product schema
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  // Save the product and return the response
  product.save().then((result)=>{
    res.status(201).json({
      message: "Created product successfully",
      createdProduct: {
        id:result._id
      }
    })
  })
  .catch((err)=>{
    res.status(500).json({
      error: err
    });
  })
  
})

router.get('/:productId', (req, res, next) => {
  const productId = req.params.productId
  // if given id not matched valid regex then return bad request
  if(!mongoose.Types.ObjectId.isValid(productId)){
    res.status(400)
    .send({
      success:false,
      status:404,
      message: "No valid entry found for provided ID",
      payload:{}
    });
  }
  Product.findById(productId)
    .select('_id name price')
    .exec()
    .then((doc)=>{
      if (doc) {
        res.status(200).send({
          success:true,
          status:200,
          message: "product GET by product id api is called",
          payload:doc
        });
      } else {
        res.status(404)
          .send({
            success:false,
            status:404,
            message: "No valid entry found for provided ID",
            payload:doc
          });
      }
      
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).send({
        error:err
      })
    })
})

router.put('/:productId', (req, res, next) => {
  const id = req.params.productId;
  
  const updateOps = {};
  for (const key in req.body) {
    updateOps[key] = req.body[key];
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).send({
        message: "Product updated",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        error: err
      });
    });
})

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).send({
        message: "Product deleted",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        error: err
      });
    });
})

module.exports = router