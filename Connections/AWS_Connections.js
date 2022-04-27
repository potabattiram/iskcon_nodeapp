const aws = require("aws-sdk");

const S3_Connection = new aws.S3({
  accessKeyId: "AKIA6PX5RHJWMCAADXU6",
  secretAccessKey: "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",                            
  Bucket: "bhaktivedant-bucketv",
});

module.exports = S3_Connection;
