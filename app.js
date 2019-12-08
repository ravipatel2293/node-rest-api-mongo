const express = require("express");

const app = express()

const productsRoutes = require('./routes/products')
const ordersRoutes = require('./routes/orders')
const morgan = require('morgan');

// Logging the request
app.use(morgan('dev'))

app.use('/products',productsRoutes)
app.use('/orders',ordersRoutes)



app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

//Handle internal server error, last method to be called
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message
      }
  });
});

// app.use((req,res,next)=>{
//   res.status(200).json({
//     messsage:"This nodejs api works"
//   })
// })

module.exports = app