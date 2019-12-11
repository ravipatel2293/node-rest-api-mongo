const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const response = require("../utils/response");
const {JWT_KEY} = require("../../config/config");

exports.userSignup = (req, res, next) => {
  User.find({
      email: req.body.email
    })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        logger.info(`User with given email (${req.body.email}) is already exist.`, "User controller: userSignup");
        return response.json(res, null, response.RESOURCE_CONFLICTS, "User with given email is already exists");
      } else {
        bcrypt.hash(req.body.password, 10, (err, hashCode) => {
          if (err) {
            logger.error(`Error occurred: ${err}`, "User controller: userSignup");
            return response.json(res, null, response.SERVER_ERROR)
          } else {
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hashCode
            });
            newUser.save()
              .then((result) => {
                logger.info("User is created successfully.", "User controller: userSignup");
                return response.json(res, result);
              })
              .catch((err) => {
                logger.error(`Error occurred: ${err}`, "User controller: userSignup database");
                return response.json(res, null, response.SERVER_ERROR)
              })
          }
        })
      }

    })
}

exports.userLogin = (req, res, next) => {
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length < 1) {
        logger.error(`Auth failed`, "User controller: userLogin");
        return response.json(res, null, response.UNAUTHORIZED);
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          logger.error(`Auth failed`, "User controller: userLogin");
          return response.json(res, null, response.UNAUTHORIZED);
        }
        if (result) {
          
          const token = jwt.sign({
              email: user[0].email,
              userId: user[0]._id
            },
            JWT_KEY, {
              expiresIn: "1h"
            }
          );
          logger.info("User login successfully", "User controller: userLogin")
          return response.json(res, {
            user: user,
            token: token
          })
        }
        return response.json(res, null, response.UNAUTHORIZED);
      });
    })
    .catch(err => {
      logger.error(`Error occurred: ${err}`, "User controller: userLogin");
      return response.json(res, null, response.SERVER_ERROR)
    });
}