var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
var app = express()
var cors = require('cors')


app.use(cors({
    origin:'http://localhost:3000'
}))

var s3 = new aws.S3({
   accessKeyId: "AKIA6PX5RHJWPJZVF7FV",
   secretAccessKey: "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",
   Bucket: "bhaktivedant-bucketv"
})



app.use(express.json());
var upload = multer({
   storage: multerS3({
       s3: s3,
       bucket:"bhaktivedant-bucketv",
       metadata: function (req, file, cb) {
           cb(null, { fieldName: file.fieldname });
       },
       key: function (req, file, cb) {
           cb(null, Date.now().toString())
       }
   })

})

app.post('/getImages',(req,res) => {
    const date = req.body.date;
    s3.listObjects({Bucket:"bhaktivedant-bucketv"},(err,data) => {
        if(err) {
            console.log(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})



//Uploading single File to aws s3 bucket
app.post('/upload', upload.single('image'), function (req, res, next) {
   res.send({
       data: req.files,
       msg: 'Successfully uploaded ' + req.files + ' files!'
   })
})


// //Uploading Multiple Files to aws s3 bucket
// app.post('/upload', upload.array('photos', 3), function (req, res, next) {
//    res.send({
//        data: req.files,
//        msg: 'Successfully uploaded ' + req.files.length + ' files!'
//    })
// })
 
app.listen(5000, function () {
   console.log('Server runs like Bolt');
})