const express = require("express");

const app = express()

const productsRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const shopifyRoutes = require("./api/routes/shopify");

const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const morgan = require('morgan');
/**
 * Make connection to the mongo db atlas account
 * //TODO--Ravi We can move password to env file later
 */
mongoose.connect(
  "mongodb+srv://ravipatel:ravipatel@cluster0-yhgnw.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
mongoose.Promise = global.Promise;
setTimeout(() => {
  console.log("mongoose connection status: ", mongoose.connection.readyState);
}, 2000);


app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
/**
 * Use body-parser as middleware
 */
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

/**
 * Enable cors from the server
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Logging the request
app.use(morgan('dev'))

app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)
app.use('/user', userRoutes)
app.use('/shopify', shopifyRoutes)



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