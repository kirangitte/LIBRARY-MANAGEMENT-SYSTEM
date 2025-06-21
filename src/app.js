const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");



const path = require("path");
const userRoutes = require("../src/routers/homerouter");
const bookRouter = require("../src/routers/bookRouter");
const studentRouter=require("../src/routers/studentRouter");
const reportRouter = require("../src/routers/reportRouter");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(session({
//   secret: "your_secret_key",
//   resave: false,
//   saveUninitialized: true,
// }));
app.use(session({
  secret: "45c0a6484481ae3757a4cf6193ac55b8938dd68dcddfc1ca6cb16810df830823d5114263a612f58e86b083f2f33db6b0f23f0aa529aa6d8818b159df7481b1dd", 
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));
app.use("/", userRoutes);
app.use("/", bookRouter);
app.use("/",studentRouter); 
app.use("/", reportRouter);


module.exports = app;
