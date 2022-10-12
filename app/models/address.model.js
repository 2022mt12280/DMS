const sql = require("./db.js");

// constructor
const Address = function(address) {
  this.firstLine = address.firstLine;
  this.secondline = address.secondline;
  this.Landmark = address.Landmark;
  this.City = address.City;
  this.District = address.District;
  this.State = address.State;
  this.Pincode = address.Pincode;
};

Address.create = (newAddress, result) => {
  sql.query("INSERT INTO Address SET ?", newAddress, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created address: ", { id: res.insertId, ...newAddress });
    result(null, { id: res.insertId, ...newAddress });
  });
};

Address.findById = (Address_id, result) => {
  sql.query(`SELECT * FROM Address WHERE Address_id = ${Address_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found address: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Address with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Address;
