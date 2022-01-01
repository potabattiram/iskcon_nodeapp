const Router = require("express").Router();
const Connection = require("../../Connections/remoteMySqlConnection");
const fs = require("fs");
const transporter = require("./transporter");

Router.post("/api/personal", (req, res) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const birthdate = req.body.birthdate;

  const ValidationQuery = `SELECT * FROM friendsList WHERE email = '${email}'`;
  Connection.query(ValidationQuery, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (data.length == 0) {
        const query = `INSERT INTO friendsList(fullname,email,birthdate) VALUES ('${fullname}','${email}','${birthdate}')`;
        Connection.query(query, (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send("Successfully added");
          }
        });
      } else {
        res.send("Already Exists");
      }
    }
  });
});

Router.get("/api/personal/sendmail", (req, res) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const toDay = date.getDate() + "_" + month;
  const filePath = "Controllers/OtherControllers/check.json";

  const data = fs.readFileSync(filePath, "utf-8");
  JSON.parse(data);
  if (!data.includes(toDay)) {
    const query = `SELECT * FROM friendsList WHERE birthdate='${toDay}'`;
    Connection.query(query, async(err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result.length > 0) {
          const emailList = await result.map((item) => {
            return {
              name: item.fullname,
              email: item.email,
            };
          });
          for (i = 0; i < emailList.length; i++) {
            var mailOptions = {
              from: "potabattiram@gmail.com",
              to: emailList[i].email,
              subject: "Birthday Wishes!🎂",
              html: "<br>Hello, " +
                emailList[i].name +
                "!" +
                "<br>How are you? " +
                "Its been a long while we have met<br>Here I remember you on your special occassion of your Birthday<br>Birthdays are inevitable, beautiful and very particular moments in our lives! <br>Moments that brings precious memories back, celebrates the present times and gives a strong hope for the future." +
                "<br>" +
                emailList[i].name +
                ", Wish you a Happy and Prosperous Birthday<br> <br>Regards<br>Balram(Ram) Potabatti",
            };
            transporter.sendMail(mailOptions, (err, success) => {
              if (err) {
                res.send(err);
              }
              if (success) {
                fs.writeFileSync(filePath, JSON.stringify(toDay));
                res.send("Email Sent Success!");
              } else {
                res.send("Email Not Sent! Failure");
              }
            });
          }
        } else {
          res.send("No Birthdays Today");
        }
      }
    });
  } else {
    res.send("Its Today");
  }
});

Router.get("/api/getfriendslist",(req,res) => {
  const query = `SELECT * FROM friendsList`;
  Connection.query(query,(err,result) => {
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }
  })
})

Router.get("/api/deleteemail/:deleteemail",(req,res) =>{
  const deleteemail = req.params.deleteemail;
  const query = `DELETE FROM friendsList WHERE email = '${deleteemail}'`;
  Connection.query(query,(err,result) => {
    if(err) {
      res.send(err)
    }
    else{
      res.send("Successfully Deleted")
    }
  })
})

module.exports = Router;
