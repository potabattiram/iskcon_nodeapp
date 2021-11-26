const aws = require("aws-sdk");

const S3_Connection = new aws.S3({
  accessKeyId: "AKIA6PX5RHJWIYF3LAVN",
  secretAccessKey: "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",
  Bucket: "bhaktivedant-bucketv",
});

module.exports = S3_Connection;
