const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");
const instrumentRouter = require("./routes/instruments");
const userRouter = require("./routes/user");
const requestRouter = require("./routes/request");
//const seedRequest = require("./seedRequest");
//const seedDB = require("./seed");
//base de datos
const url = "mongodb://localhost/administrador";
mongoose.connect( process.env.MONGODB_URI || url);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

//seedRequest();
//seedDB();

app.use("/api/instruments", instrumentRouter);
app.use("/api/user", userRouter);
app.use("/api/request", requestRouter);

module.exports = app;