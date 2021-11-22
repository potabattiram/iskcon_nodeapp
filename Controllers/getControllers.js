const express = require("express");
const Router = express.Router();
const s3_Connection = require("../Connections/AWS_Connections");

// Router.get("/getimagesurl", (req, res) => {
//   s3_Connection.listObjects({ Bucket: "bhaktivedant-bucketv" }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const imageData = data.Contents.map((image) => {
//         return {
//           key: image.Key,
//           url: `https://bhaktivedant-bucketv.s3.amazonaws.com/${image.Key}`,
//         };
//       });
//       res.send(imageData);
//     }
//   });
// });

Router.get("/getimagesurl/:date", (req, res) => {
  const date = req.params.date;
  s3_Connection.listObjects({ Bucket: "bhaktivedant-bucketv" }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const imageData = data.Contents.map((img) => {
        return {
          key: img.Key ? (img.Key.startsWith(date) && img.Key) : null,
        };
      });
      var myFilterArray = imageData.filter((img) => {
        if (img.key){
          return img
        }
      });
     res.send(myFilterArray);
    }
  });
});

Router.get("/getfoldernames", (req, res) => {
  s3_Connection.listObjects({ Bucket: "bhaktivedant-bucketv" }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const imageData = data.Contents.map((img) => {
        return {
          key: img.Key ? (img.Key.split("/").length >= 2 && img.Key.split("/")[1] != "" ? img.Key : null) : null,
        };
      });
      res.send(imageData);
    }
  });
});

Router.get("/folder/:foldername",(req,res) => {
  const foldername = req.params.foldername;
  s3_Connection.listObjects({ Bucket: "bhaktivedant-bucketv", Prefix: req.params.foldername }, (err, data) => {
    if (err){
      console.log(err)
    }
    else{
      const imageData = data.Contents.map((img) => {
        return {
          key: img.Key ? (img.Key.startsWith(foldername) && img.Key.split("/")[1] != "" ? img.Key : null) : null,
        };
      })
      res.send(imageData);
    }
  })
})

module.exports = Router;
