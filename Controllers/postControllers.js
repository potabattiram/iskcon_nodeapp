const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3_Connection = require("../Connections/AWS_Connections");
const path = require("path");

var date = new Date();
var month = date.getMonth() + 1;
const upload = multer({
  storage: multerS3({
    s3: s3_Connection,
    bucket: "bhaktivedant-bucketv",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, date.getDate()+"_"+month+"_"+date.getFullYear()+"_"+Math.floor(1000 + Math.random() * 9000)  + path.extname(file.originalname));
    },
  }),
});

router.post("/upload", upload.single("file"), function (req, res) {
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

module.exports = router;
