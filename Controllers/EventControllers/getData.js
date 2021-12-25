const express = require("express");
const Router = express.Router();
const Connection = require("../../Connections/remoteMySqlConnection");

Router.get("/api/get_data", (req, res) => {
  const query = "SELECT * FROM iskconEventData";
  Connection.query(query, (err, result) => {
    if (err){
      res.send(err)
    }
    res.send(result);
  });
});


module.exports = Router;
