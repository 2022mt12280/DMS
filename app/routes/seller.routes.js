module.exports = app => {
  const seller = require("../controllers/seller.controller.js");

  var router = require("express").Router();

  // Create a new Seller
  router.post("/", seller.create);

  // Retrieve a single Seller with email
  router.get("/:Email_id", seller.findOne);

  app.use('/api/seller', router);
};
