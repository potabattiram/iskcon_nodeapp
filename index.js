const express = require("express");
const app = express();
const cors = require("cors");
const cluster = require("cluster");
const os = require("os");

// NUMBER OF PORTS INSIDE OUR CPU
const numCPU = os.cpus().length;

// CORS HANDLER
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// API IMPORTS
const get_Controllers = require("./Controllers/getControllers");
const post_Controllers = require("./Controllers/postControllers");
const mainController = require("./Controllers/EventControllers/mainController");
const getController = require("./Controllers/EventControllers/getData");
// const webdev = require("./Controllers/WebDev/webdevMain");

// PERSONAL
const personalController = require("./Controllers/OtherControllers/main");

app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"],
    exposedHeaders: ["authorization"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);


app.get("/", (req, res) => {
  res.send(`Hare Krishna, Everything looks perfect by Worker ${process.pid}!`);
});

// API Initialization
app.use(get_Controllers);
app.use(post_Controllers);
// app.use(mainController);
// app.use(getController);
// app.use(personalController);
// app.use(webdev);

if (cluster.isMaster) {
  for (let i = 0; i <= numCPU; i++) {
    cluster.fork();
  }
} else {
  app.listen(process.env.PORT || 3001, () => {
    console.log(
      `Server ${process.pid} runs like Usain Bolt, Click @ http://localhost:3001`
    );
  });
}
