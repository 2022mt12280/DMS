const sql = require("./db.js");

// constructor
const Seller = function(seller) {
  this.Email_id = seller.Email_id;
  this.Password = seller.Password;
  this.Registered_name = seller.Registered_name;
  this.MobileNo = seller.MobileNo;
};

Seller.create = (newSeller, result) => {
  sql.query("INSERT INTO Seller SET ?", newSeller, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created seller: ", { id: res.insertId, ...newSeller });
    result(null, { id: res.insertId, ...newSeller });
  });
};

Seller.findByEmail = (Email_id, result) => {
  sql.query(`SELECT * FROM Seller WHERE Email_id = '${Email_id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found seller: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Seller with the Email_id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Seller;
