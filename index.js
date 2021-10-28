const express = require("express");
const connectDB = require("./config/db");
const app = express();

//Connect Database

connectDB();

//Init MiddleWare

app.use(express.json());

//Defining Routes

app.get("/", (req, res) => res.send("API Running"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/device", require("./route/api/device"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
