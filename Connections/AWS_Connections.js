const aws = require("aws-sdk");
const Router = require("express").Router();


const S3_Connection = new aws.S3({
  accessKeyId: "AKIA6PX5RHJWD3FDPEPG",
  secretAccessKey: "",                             // ADD KEY HERE
  Bucket: "bhaktivedant-bucketv",
});

module.exports = S3_Connection;
