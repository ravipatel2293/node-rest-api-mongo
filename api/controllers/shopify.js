const mongoose = require("mongoose");
const nonce = require('nonce')();
const cookie = require('cookie');
const querystring = require('querystring');
const logger = require("../utils/logger");
const response = require("../utils/response")
const shopifyUtils = require("../utils/shoify");
const {SHOPIFY_API_KEY,SHOPIFY_API_SECRET} = require("../../config/config");


exports.getRedirectUrl = (req, res, next) => {
  // Get shop name from the query parms
  const shop = req.query.shop;

  if (!shop) {
    return res.status(400).send('no shop')
  }

  // Generate nounce to verify it in next callback request
  const state = nonce();

  // Generate shopify auth url and redirect user on it
  const installShopUrl = shopifyUtils.buildInstallUrl(shop, state, shopifyUtils.buildRedirectUri());
  logger.info(`generated auth shopify url for shop:${shop}`, "Shopify controller: getRedirectUrl");

  res.cookie('state', state); // should be encrypted in production
  res.redirect(installShopUrl);
  // Product.find()
  //   .select('_id name price')
  //   .exec()
  //   .then((docs) => {
  //     logger.info("All products fetched successfully", "Product controller: getAllProduct")
  //     return response.json(res, {
  //       count: docs.length,
  //       products: docs
  //     })
  //   })
  //   .catch((err) => {
  //     logger.error(`Error occurred: ${err}`, "Database Product controller: getAllProduct")
  //     return response.json(res, null, response.SERVER_ERROR, err.message)
  //   })
}

exports.getShopifyAccessToken = async (req, res, next) => {
  const { shop, code, state } = req.query;
  const stateCookie = cookie.parse(req.headers.cookie).state;

  if (state !== stateCookie) { return res.status(403).send('Cannot be verified')}

  const { hmac, ...params } = req.query
  const queryParams = querystring.stringify(params)
  const hash = shopifyUtils.generateEncryptedHash(queryParams)

  if (hash !== hmac) { return res.status(400).send('HMAC validation failed')}

  try {
    const data = {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code
    };
    const tokenResponse = await shopifyUtils.fetchAccessToken(shop, data)

    console.log("tokenresponse====>>>",tokenResponse)
    const { access_token } = tokenResponse.data

    res.status(200).send("Got an access token, let's do something with it");

  } catch(err) {
    logger.error(`Error occured:${err}`,"Shopify controller:getShopifyAccessToken")
    response.json(res,null,response.SERVER_ERROR)
  }
}