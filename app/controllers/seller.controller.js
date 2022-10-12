const Seller = require("../models/seller.model.js");
const Address = require("../models/address.model.js");

// Create and Save a new Seller
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Request params can not be empty!"
    });
  }

  // Create a Seller
  const seller = new Seller({
    Email_id: req.body.Email_id,
    Password: req.body.Password,
    Registered_name: req.body.Registered_name,
    MobileNo: req.body.MobileNo
  });

  // Create a Address
  const address = new Address({
    firstLine: req.body.firstLine,
    secondline: req.body.secondline,
    Landmark: req.body.Landmark,
    City: req.body.City,
    District: req.body.District,
    State: req.body.State,
    Pincode: req.body.Pincode
  });

  // Save Address in the database
  Address.create(address, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Address."
      });
    else {
      seller['Address_id'] = data.id;
      Seller.create(seller, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Seller."
          });
        else res.send(data);
      });
    }
  });
};

// Find a single Seller by email
exports.findOne = (req, res) => {
  Seller.findByEmail(req.params.Email_id, (err, dataSeller) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Seller with Email_id ${req.params.Email_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Seller with Email_id " + req.params.id
        });
      }
    } else {
      Address.findById(dataSeller.Address_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Address for Email_id ${req.params.Email_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Address for Email_id " + req.params.id
            });
          }
        } else {
          dataSeller["Address"] = data;
          res.send(dataSeller);
        }
      });
    }
  });
};
