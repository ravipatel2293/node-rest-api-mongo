// let generate = (err, message, status,data) =>{
//   let response = {
//       error:err,
//       message:message,
//       status:status,
//       payload:data
//   }
//   return response
// }

// module.exports= {
//   generate:generate
// }
"use strict";

module.exports = {

  BAD_REQUEST: {
    status: 400,
    code:400,
    type: "BAD_REQUEST",
    message: "Invalid request"
  },

  UNAUTHORIZED: {
    status: 401,
    code:401,
    type: "UNAUTHORIZED",
    message: "Unauthorized. Please login first!"
  },

  REQUEST_FAILED: {
    status: 402,
    code:402,
    type: "REQUEST_FAILED",
    message: "Request failed!"
  },

  FORBIDDEN: {
    status: 403,
    code:403,
    type: "FORBIDDEN",
    message: "You have not enough permission for this resource!"
  },

  NOT_FOUND: {
    status: 404,
    code:404,
    type: "NOT_FOUND",
    message: "Not found!"
  },

  TOO_MANY_REQUEST: {
    status: 429,
    code:429,
    type: "TOO_MANY_REQUEST",
    message: "Too many request!"
  },

  SERVER_ERROR: {
    status: 500,
    code:500,
    type: "SERVER_ERROR",
    message: "Server error"
  },

  NOT_IMPLEMENTED: {
    status: 501,
    code:501,
    type: "NOT_IMPLEMENTED",
    message: "This resource is not implemented!"
  },

  RESOURCE_CONFLICTS:{
    status:409,
    code:409,
    type: "RESOURCE_CONFLICTS",
    message: "This resource is already exists."
  },

  /**
   * Generate a JSON REST API response
   *
   * If data present and no error, we will send status 200 with JSON data
   * If no data but has error, we will send HTTP error code and message
   * 
   * @param  {Object} res        	ExpressJS res object
   * @param  {json} 	data       	JSON response data
   * @param  {Object} err        	Error object
   * @param  {String} errMessage  Custom error message
   * @return {json} If res assigned, return with res, otherwise return the response JSON object
   */
  json(res, payload, err, errMessage) {
    let response = {};

    if (err) {
      response.error = err;
      // delete response.error.status;
      response.status = err.status || 500;
      if (errMessage)
        response.error.message = errMessage.message || errMessage;

      response.payload = payload;

      return res ? res.status(response.status).json(response) : response;
    }

    response.status = 200;
    response.payload = payload;

    return res ? res.json(response) : response;
  }

};