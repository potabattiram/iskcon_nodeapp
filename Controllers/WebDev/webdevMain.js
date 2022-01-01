const Connection = require("../../Connections/remoteMySqlConnection");
const Router = require("express").Router();

Router.post("/api/webdev/newyeardata", (req, res) => {
    const fullname = req.body.fullname;
    const businessname = req.body.businessname;
    const email = req.body.email;
    const phone = req.body.phone;
  
    let insertQuery = `INSERT INTO businessData (fullname, businessname, email, phone) VALUES ('${fullname}', '${businessname}', '${email}', '${phone}')`;
    Connection.query(insertQuery,(err,resp) => {
      if(err){
        res.send(err);
      }
      else{
        res.send(resp);
      }
    })
  });

module.exports = Router;