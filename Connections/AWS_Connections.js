const aws = require("aws-sdk");
require('dotenv').config();


const S3_Connection = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEy,
  secretAccessKey: process.env.AWS_SECRETKEY,                            
  Bucket: process.env.AWS_BUCKET_NAME,
});



module.exports = S3_Connection;
