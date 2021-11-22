const aws = require("aws-sdk");

const S3_Connection = new aws.S3({
  accessKeyId: "AKIA6PX5RHJWPJZVF7FV",
  secretAccessKey: "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",
  Bucket: "bhaktivedant-bucketv",
});

module.exports = S3_Connection;
