const aws = require("aws-sdk");

const S3_Connection = new aws.S3({
  accessKeyId: "AKIA6PX5RHJWD3FDPEPG",
  secretAccessKey: "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",
  Bucket: "bhaktivedant-bucketv",
});

module.exports = S3_Connection;
