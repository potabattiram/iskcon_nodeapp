const express = require("express");
const Router = express.Router();
const s3_Connection = require("../Connections/AWS_Connections");


Router.get("/getimagesurl/:date", (req, res) => {
  const date = req.params.date;
  s3_Connection.listObjects({ Bucket: "bhaktivedant-bucketv" }, async(err, data) => {
    if (err) {
      res.send("err")
    } else {
      if(data != null){
        const imageData = await data.Contents.filter((img) => img.Key.startsWith(date)).map((processedImage) => processedImage.Key)
        res.send(imageData)
      }
      else{
        res.send("No data found")
      }
    }
  });
});


Router.get("/geteventimages",(req, res) => {
  s3_Connection.listObjects({ Bucket: "dailyeventimages" }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
    //  const imageData = data.Contents.map((img) => {
    //     return {
    //       key: img.Key ? (img.Key.startsWith("0000")  && img.Key) : null,
    //     };
    //   });
      const imageData = data.Contents.filter((img) => img.Key.startsWith("0000"))
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
      if(myFilterArray.length>0){
        myFilterArray.forEach((img) => {
        s3_Connection.deleteObject({
          Bucket: "dailyeventimages",
          Key: img.key,
        }, (err, data) => {
          if (err) {
            res.send(err);
          } else {
            res.status(200).send("Deleted Successfully");
          }
        });
      });
      }
      else{
        res.status(202).send("No images to delete");
      }
    }
  })
})




module.exports = Router;














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