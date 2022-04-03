const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3_Connection = require("../Connections/AWS_Connections");
const path = require("path");

const date = new Date();
const today = ("0" + (date.getDate())).slice(-2)
const month = ("0" + (date.getMonth()+1)).slice(-2)
const year = date.getFullYear()
const name = today+"_"+month+"_"+year+"_"+Math.floor(1000 + Math.random() * 9000) 
const uploadDailyDarshan = multer({
  storage: multerS3({
    s3: s3_Connection,
    bucket: "bhaktivedant-bucketv",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, name+"_"+Math.floor(1000 + Math.random() * 9000)  + path.extname(file.originalname));
    },
  }),
});

router.post("/upload", uploadDailyDarshan.array("file"), function (req, res) {
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
const uploadPrevEvents = multer({
  storage: multerS3({
    s3: s3_Connection,
    bucket: "dailyeventimages",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null,zeros + "_" +name+"_"+Math.floor(1000 + Math.random() * 9000)  + path.extname(file.originalname));
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