const express = require("express");
const Router = express.Router();
const s3_Connection = require("../Connections/AWS_Connections");
const fs = require('fs');


Router.get("/getimagesurl/:date", (req, res) => {
  const month = new Date().getMonth()+1;
  const toDay = new Date().getDate() + "_" + month + "_" + new Date().getFullYear();
  const date = req.params.date;
  if(date == toDay){
    const cacheData = fs.readFileSync('./Controllers/cacheData.json','utf-8');
    if(cacheData){
      const processedData = JSON.parse(cacheData)
      if(processedData[0].key.startsWith(date)){
        res.send(processedData);
      }
      else{
        s3_Connection.listObjects({ Bucket: "bhaktivedant-bucketv" }, (err, data) => {
          if (err) {
            res.send(err)
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
            if(date == toDay){
            fs.writeFileSync('./Controllers/cacheData.json', JSON.stringify(myFilterArray,null,2));

            }
            res.send(myFilterArray);
          }
        });
      }
    }
    else{
      s3_Connection.listObjects({ Bucket: "bhaktivedant-bucketv" }, (err, data) => {
        if (err) {
          res.send(err)
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
          if(date == toDay){
          fs.writeFileSync('./Controllers/cacheData.json', JSON.stringify(myFilterArray,null,2));
          }
          res.send(myFilterArray);
        }
      });
    }
  }
  s3_Connection.listObjects({ Bucket: "bhaktivedant-bucketv" }, (err, data) => {
    if (err) {
      res.send(err)
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
      if(date == toDay){
      fs.writeFileSync('./Controllers/cacheData.json', JSON.stringify(myFilterArray,null,2));
      }
      res.send(myFilterArray);
    }
  });
});


Router.get("/geteventimages", (req, res) => {
  s3_Connection.listObjects({ Bucket: "dailyeventimages" }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
     const imageData = data.Contents.map((img) => {
        return {
          key: img.Key ? (img.Key.startsWith("0000")  && img.Key) : null,
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