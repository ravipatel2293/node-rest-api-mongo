const jwt = require('jsonwebtoken');
const logger = require("../utils/logger");
const response = require("../utils/response");
const {JWT_KEY} = require("../../config/config");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,JWT_KEY);
        req.userData = decoded;
        // console.log("decoded",decoded)
        next();
    } catch (error) {
        return response.json(res,null,response.UNAUTHORIZED)
    }
};