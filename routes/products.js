const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "product GET api is called"
  })
})

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: "product POST apis is called"
  })
})

router.get('/:productId', (req, res, next) => {
  const productId = req.params.productId
  res.status(200).json({
    message: 'GET product api is called',
    productId:productId
  })
})

router.put('/:productId', (req, res, next) => {
  const productId = req.params.productId
  res.status(200).json({
    message: 'PUT product api is called',
    productId:productId
  })
})

router.delete('/:productId', (req, res, next) => {
  const productId = req.params.productId
  res.status(200).json({
    message: 'DELETE product api is called',
    productId:productId
  })
})

module.exports = router