const express = require("express");
const Router = express.Router();
const Connection = require("../../Connections/remoteMySqlConnection");

Router.post("/api/add_data", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const addr = req.body.addr;
  const upiid = req.body.upiid;
  
  const UPIValidationQuery = `SELECT * FROM iskconEventData where upiid = '${upiid}'`;
  Connection.query(UPIValidationQuery,(error,results) => {
    if(error){
      res.send(error)
    }
    else{
      if(results.length > 0){
        res.send("UPIID already exists!")
      }
      else{
        const query = `INSERT INTO iskconEventData (name,phone,email,addr,upiid) VALUES ('${name}','${phone}','${email}','${addr}','${upiid}')`;
        Connection.query(query, (err, result) => {
          if (err){
            res.send(err)
          }
          else{
            res.send("Successfully Image Uploaded and Data Inserted");
          }
        });
      }
    }
  })

 
});


module.exports = Router;
