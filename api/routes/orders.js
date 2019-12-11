const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "order GET api is called"
  })
})

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: "order POST apis is called"
  })
})

router.get('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId
  res.status(200).json({
    message: 'GET order api is called',
    orderId:orderId
  })
})

router.put('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId
  res.status(200).json({
    message: 'PUT order api is called',
    orderId:orderId
  })
})

router.delete('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId
  res.status(200).json({
    message: 'DELETE product api is called',
    orderId:orderId
  })
})

module.exports = router