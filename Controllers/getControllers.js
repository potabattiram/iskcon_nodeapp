const express = require("express");
const Router = express.Router();
const s3_Connection = require("../Connections/AWS_Connections");

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


Router.get("/geteventimages", (req, res) => {
  const date=new Date();
  const datee = ("0" + (date.getDate())).slice(-2);
  s3_Connection.listObjects({ Bucket: "dailyeventimages" }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
     const imageData = data.Contents.map((img) => {
        return {
          key: img.Key ? (img.Key.startsWith(datee)  && img.Key) : null,
        };
      });
      res.send(imageData);
    }
  });
});


Router.get("/deletealleventimages",(req,res) => {
  s3_Connection.listObjects({ Bucket: "dailyeventimages" }, (err, data) => {
    if(err){
      res.send(err);
    }
    else{
      const imageData = data.Contents.map((img) => {
        return {
          key: img.Key ? (img.Key.startsWith("0000") && img.Key) : null,
        };
      });
      var myFilterArray = imageData.filter((img) => {
        if (img.key){
          return img
        }
      });
      myFilterArray.forEach((img) => {
        s3_Connection.deleteObject({
          Bucket: "dailyeventimages",
          Key: img.key,
        }, (err, data) => {
          if (err) {
            res.send(err);
          } else {
            res.send("Success in deleting images");
          }
        });
      });
    }
  })
 
})


// Router.get("/getfoldernames", (req, res) => {
//   s3_Connection.listObjects({ Bucket: "bhaktivedant-bucketv" }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const imageData = data.Contents.map((img) => {
//         return {
//           key: img.Key ? (img.Key.split("/").length >= 2 && img.Key.split("/")[1] != "" ? img.Key : null) : null,
//         };
//       });
//       res.send(imageData);
//     }
//   });
// });

// Router.get("/folder/:foldername",(req,res) => {
//   const foldername = req.params.foldername;
//   s3_Connection.listObjects({ Bucket: "bhaktivedant-bucketv", Prefix: req.params.foldername }, (err, data) => {
//     if (err){
//       console.log(err)
//     }
//     else{
//       const imageData = data.Contents.map((img) => {
//         return {
//           key: img.Key ? (img.Key.startsWith(foldername) && img.Key.split("/")[1] != "" ? img.Key : null) : null,
//         };
//       })
//       res.send(imageData);
//     }
//   })
// })

module.exports = Router;
