const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3_Connection = require("../Connections/AWS_Connections");
const path = require("path");
const {GoogleSpreadsheet} = require('google-spreadsheet')
const fs = require("fs");
const { google } = require("googleapis");


var date = new Date();
var today = ("0" + (date.getDate())).slice(-2)
var month = date.getMonth() + 1;
const uploadDailyDarshan = multer({
  storage: multerS3({
    s3: s3_Connection,
    bucket: "bhaktivedant-bucketv",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, today+"_"+month+"_"+date.getFullYear()+"_"+Math.floor(1000 + Math.random() * 9000)  + path.extname(file.originalname));
    },
  }),
});

router.post("/upload", uploadDailyDarshan.single("file"), function (req, res) {
  if (res.statusCode == 200) {
    res.send({
      data: req.files,
      msg: "Successfully uploaded files!",
    });
    
  }
  else{
    res.send("Error")
  }
  
});




// UPLOAD DAILY EVENT IMAGES
var date = new Date();
var zeros = "0000";
var today = ("0" + (date.getDate())).slice(-2);
var month = date.getMonth() + 1;
const uploadPrevEvents = multer({
  storage: multerS3({
    s3: s3_Connection,
    bucket: "dailyeventimages",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null,zeros + "_" + today+"_"+month+"_"+date.getFullYear()+"_"+Math.floor(1000 + Math.random() * 9000)  + path.extname(file.originalname));
    },
  }),
});

router.post("/upload/dailyEvent", uploadPrevEvents.single("file"), (req,res) => {
  if (res.statusCode == 200) {
    res.send({
      data: req.files,
      msg: "Successfully uploaded files!",
    });
  }
  else{
    res.send("Error")
  }
  
})

router.get("/api/event",async(req,res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "Controllers/utsavCredentials.json", 
    scopes: "https://www.googleapis.com/auth/spreadsheets", 
});
  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
  const spreadsheetId = "1fgVrWACiEQhuaPs7UoudAXZSO4xdUdvudIGvRj4yDrA";

  const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId, // spreadsheet id
    range: "Sheet1!A:A", //range of cells to read from.
})
res.send(readData.data)
})





module.exports = router;






// router.post('/upload/many', upload.array('file', 10), function (req, res, next) {
//   if (res.statusCode == 200) {
//     res.send({
//       len: req.files.length,
//       msg: "Successfully uploaded files!",
//     });
    
//   }
//   else{
//     res.send("Error")
//   }
// })