var aws = require("aws-sdk");
var express = require("express");
var multer = require("multer");
var multerS3 = require("multer-s3");
var app = express();
var cors = require("cors");
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://iskcon-solapur.web.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
  
app.use(
  cors({
    origin: "https://iskcon-solapur.web.app",
    methods: ["GET", "POST"],
  })
);

var s3 = new aws.S3({
  accessKeyId: "AKIA6PX5RHJWPJZVF7FV",
  secretAccessKey: "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",
  Bucket: "bhaktivedant-bucketv",
});

app.use(express.json());
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "bhaktivedant-bucketv",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

app.get("/getimagesurl", (req, res) => {
  s3.listObjects({ Bucket: "bhaktivedant-bucketv" }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const imageData = data.Contents.map((image) => {
        return {
          key: image.Key,
          url: `https://bhaktivedant-bucketv.s3.amazonaws.com/${image.Key}`,
        };
      });
      res.send(imageData);
    }
  });
});

//Uploading single File to aws s3 bucket
// app.post('/upload', upload.single('file'), function (req, res, next) {
//    res.send({
//        data: req.files,
//        msg: 'Successfully uploaded files!'
//    })
// })

// //Uploading Multiple Files to aws s3 bucket
// app.post('/upload', upload.array('photos', 3), function (req, res, next) {
//    res.send({
//        data: req.files,
//        msg: 'Successfully uploaded ' + req.files.length + ' files!'
//    })
// })

app.listen(5000, function () {
  console.log("Server runs like Bolt");
});
