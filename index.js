const express = require("express");
const app = express();
const cors = require("cors");

// DOMAIN
// const allowedOrigins = 'https://iskcon-solapur.web.app';

// CORS HANDLER
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// API IMPORTS
const get_Controllers = require("./Controllers/getControllers");
const post_Controllers = require("./Controllers/postControllers");

app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"],
    exposedHeaders: ["authorization"],
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.get("/",(req,res) => {
  res.send("Hare Krishna, Everything looks perfect!")
})


// API Initialization
app.use(get_Controllers);
app.use(post_Controllers);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server runs like Bolt");
});