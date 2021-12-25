const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3_Connection = require("../Connections/AWS_Connections");
const path = require("path");

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