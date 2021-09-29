const express = require("express");
const app = express();

//Init MiddleWare

app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));

//Defining Routes

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/devices", require("./route/api/devices"));

// app.use("/api/devices", require("./route/api/devices"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
