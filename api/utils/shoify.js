const crypto = require('crypto');
const axios = require("axios");
const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET
} = require("../../config/config");
const scopes = 'read_products,write_products,read_orders,write_orders';
const appUrl = 'https://10247d95.ngrok.io';
const shopName = "https://alladin-stores.myshopify.com/";


///////////// Helper Functions /////////////

const buildRedirectUri = () => `${appUrl}/shopify/callback`;

const buildInstallUrl = (shop, state, redirectUri) => `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${scopes}&state=${state}&redirect_uri=${redirectUri}`;

const buildAccessTokenRequestUrl = (shop) => `https://${shop}/admin/oauth/access_token`;

const buildShopDataRequestUrl = (shop) => `https://${shop}/admin/api/2019-10/shop.json`;

const buildOrdersRequestUrl = (shop) => `https://${shop}/admin/api/2019-10/orders.json`;

const generateEncryptedHash = (params) => crypto.createHmac('sha256', SHOPIFY_API_SECRET).update(params).digest('hex');

const fetchAccessToken = async (shop, data) => await axios(buildAccessTokenRequestUrl(shop), {
  method: 'POST',
  data
});

const fetchAllOrders = (shop) =>{
  return axios(buildOrdersRequestUrl(shop),{
    method:'GET'
  })
}

module.exports = {
  buildRedirectUri:buildRedirectUri,
  buildInstallUrl:buildInstallUrl,
  buildAccessTokenRequestUrl:buildAccessTokenRequestUrl,
  generateEncryptedHash:generateEncryptedHash,
  buildShopDataRequestUrl:buildShopDataRequestUrl,
  fetchAccessToken:fetchAccessToken,
  fetchAllOrders:fetchAllOrders
}
// module.exports.fetchShopData = async (shop, accessToken) => await axios(buildShopDataRequestUrl(shop), {
//   method: 'GET',
//   headers: {
//     'X-Shopify-Access-Token': accessToken
//   }
// });