'use strict';
const express = require('express');
const api = express.Router();
const contrIndex = require("../controllers/index");
const middleware = require("../middleware/index");

api.route("/")
  .get(contrIndex.test);

api.route("/loop")
  .get(contrIndex.validateLoop);

api.route("/addAuth")
  .get(contrIndex.generateAuth);

api.get("/auth",
  middleware.authPrivate,
  contrIndex.validateAuth);

api.get("/uno",
  middleware.uno,
  contrIndex.uno);

module.exports = api;