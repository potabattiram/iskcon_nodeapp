const express = require("express");
const app = express();
const cors = require("cors");

// API IMPORTS
const get_Controllers = require("./Controllers/getControllers");
const post_Controllers = require("./Controllers/postControllers");

// const allowedOrigins = ['https://iskcon-solapur.web.app'];
app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"],
    exposedHeaders: ["authorization"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.use(express.json());

app.get("/",(req,res) => {
  res.send("Hare Krishna, Everything looks perfect!")
})


// API Initialization 

app.use(get_Controllers);
app.use(post_Controllers);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server runs like Bolt");
});